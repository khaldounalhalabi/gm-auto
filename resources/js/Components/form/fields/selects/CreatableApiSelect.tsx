import {
    IApiSelectProps,
    isEqual,
    isOption,
    Option,
} from "@/Components/form/fields/selects/SelectUtils";
import ChevronDown from "@/Components/icons/ChevronDown";
import LoadingSpinner from "@/Components/icons/LoadingSpinner";
import XMark from "@/Components/icons/XMark";
import { Badge } from "@/Components/ui/shadcn/badge";
import { Button } from "@/Components/ui/shadcn/button";
import { Input } from "@/Components/ui/shadcn/input";
import { Label } from "@/Components/ui/shadcn/label";
import { getNestedPropertyValue } from "@/helper";
import { usePage } from "@inertiajs/react";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";

function CreatableApiSelect<TResponse, TData>({
    api,
    getIsLast,
    getTotalPages,
    getDataArray,
    label,
    clearable = true,
    styles = undefined,
    name = undefined,
    isMultiple = false,
    closeOnSelect = true,
    optionLabel = undefined,
    optionValue = undefined,
    getOptionLabel = undefined,
    getOptionValue = undefined,
    onSelect = undefined,
    placeHolder = "Select An Item",
    defaultValue = undefined,
    onChange = undefined,
    revalidateOnOpen = false,
    revalidateKey = undefined,
    inputProps = {},
    getNextPage = undefined,
    required = false,
    renderItem = undefined,
    onCreateOption = undefined,
    createButtonText = "Add New",
}: IApiSelectProps<TResponse, TData>) {
    const errors = usePage().props.errors;
    const error = name && errors[name] ? errors[name] : undefined;
    const [creating, setCreating] = useState(false);

    const getOption = (item: TData): Option => ({
        label: getOptionLabel
            ? getOptionLabel(item)
            : (getNestedPropertyValue(item, String(optionLabel)) ?? undefined),
        value: getOptionValue
            ? getOptionValue(item)
            : (getNestedPropertyValue(item, String(optionValue)) ?? undefined),
    });

    let df: Option[] = [];

    if (defaultValue) {
        if (!Array.isArray(defaultValue)) {
            df = [
                isOption(defaultValue) ? defaultValue : getOption(defaultValue),
            ];
        } else {
            df = defaultValue.map((val) => {
                if (isOption(val)) {
                    return val;
                } else return getOption(val);
            });
        }
    }

    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<{ label: any; value: any }[]>(df);
    const [search, setSearch] = useState<string | undefined>(undefined);
    const [items, setItems] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [isLast, setIsLast] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const inputRef = useRef<HTMLInputElement>(null);
    const fullContainer = useRef<HTMLDivElement>(null);

    const getData = async () => {
        if (!isLoading) {
            setIsLoading(true);
            await api(page, search, isLast, totalPages).then(
                (data: TResponse) => {
                    setItems((prev) => [
                        ...(getDataArray(data) ?? []),
                        ...prev,
                    ]);
                    setIsLoading(false);
                    setIsLast(getIsLast(data) ?? true);
                    setTotalPages(getTotalPages(data) ?? 1);
                },
            );
        }
    };

    const revalidate = async () => {
        setItems([]);
        setPage(1);
        setIsLast(false);
        setTotalPages(1);
        setSearch(undefined);
        await getData();
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            fullContainer.current &&
            !fullContainer.current.contains(event.target as Node)
        ) {
            setIsOpen(false);
        }
    };

    const handleChoseItem = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        item: TData,
    ) => {
        e.stopPropagation();

        const option = getOption(item);
        if (isMultiple) {
            if (include(option, selected)) {
                setSelected((prev) =>
                    prev.filter((sel) => !isEqual(sel, option)),
                );
            } else {
                setSelected((prev) => [option, ...prev]);
            }
        } else {
            if (include(option, selected)) {
                setSelected([]);
            } else {
                setSelected([option]);
            }
        }

        if (onSelect) {
            onSelect(item, selected, setSelected, e);
        }

        if (closeOnSelect) {
            setIsOpen(false);
        }
    };

    const handleOpen = () => {
        setIsOpen((prev) => !prev);
        if (!isOpen) {
            if (revalidateOnOpen) {
                setItems([]);
                setPage(1);
                setIsLast(false);
                setTotalPages(1);
            }
            if (search) {
                setSearch(undefined);
            }
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPage(1);
        setIsLast(false);
        setTotalPages(1);
        setSearch(e.target.value);
        setItems([]);
    };

    const handleClickingOnSearchInput = (
        e: React.MouseEvent<HTMLInputElement, MouseEvent>,
    ) => {
        e.stopPropagation();
        setIsOpen(true);
    };

    const handleRemoveFromSelected = (
        e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
        clickedItem: Option,
    ) => {
        e.stopPropagation();
        setSelected((prev) => prev.filter((i) => !isEqual(i, clickedItem)));
    };

    const handleDataScrolling = (e: any) => {
        const { scrollTop, clientHeight, scrollHeight } = e.target;
        if (scrollHeight - scrollTop === clientHeight) {
            if (getNextPage) {
                setPage((oldPage) => getNextPage(oldPage, isLast, totalPages));
            } else if (!isLast && page <= totalPages) {
                setPage((oldPage) => oldPage + 1);
            }
        }
    };

    const handleCreateOption = async () => {
        if (!search || !onCreateOption) return;

        try {
            setCreating(true);
            const newItem = await onCreateOption(search);

            // Add the new item to the items list
            setItems((prev) => [newItem, ...prev]);

            // Select the newly created item
            const newOption = getOption(newItem);
            if (isMultiple) {
                setSelected((prev) => [newOption, ...prev]);
            } else {
                setSelected([newOption]);
            }

            // Clear search
            setSearch("");

            // Trigger onChange event
            if (onChange && inputRef.current) {
                const newValue = isMultiple
                    ? JSON.stringify([
                          ...selected.map((s) => s.value),
                          newOption.value,
                      ])
                    : newOption.value;

                inputRef.current.value = newValue;
                inputRef.current.dispatchEvent(
                    new Event("input", { bubbles: true }),
                );
            }

            if (closeOnSelect) {
                setIsOpen(false);
            }
        } catch (error) {
            console.error("Error creating new option:", error);
        } finally {
            setCreating(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            if (revalidateOnOpen) {
                getData();
            }
        }
    }, [isOpen]);

    useEffect(() => {
        getData();
    }, [page, search]);

    useEffect(() => {
        if (revalidateKey !== undefined) {
            revalidate();
        }
    }, [revalidateKey]);

    useEffect(() => {
        inputRef?.current?.dispatchEvent(new Event("input", { bubbles: true }));
    }, [selected]);

    const getInputValue = () => {
        if (isMultiple) {
            return JSON.stringify(selected.map((option) => option.value));
        } else {
            return selected?.[0]?.value ?? "";
        }
    };

    return (
        <div
            className={`relative grid w-full grid-cols-1 items-center gap-3 duration-300 select-none`}
            ref={fullContainer}
        >
            {label && (
                <Label htmlFor={`${name}_id`} className={styles?.labelClasses}>
                    {label}
                    {required && <span className={"text-destructive"}>*</span>}
                </Label>
            )}

            <input
                ref={inputRef}
                id={`${name}_id`}
                name={name}
                value={getInputValue()}
                className={`hidden`}
                onInput={(e: ChangeEvent<HTMLInputElement>) => {
                    if (onChange) {
                        let arrayValues: [] = [];
                        try {
                            if (e.target.value) {
                                arrayValues = JSON.parse(e.target.value);
                            }
                        } catch (error) {
                            arrayValues = [];
                            console.error("Error in Api Multi select");
                            console.error(error);
                            console.error(
                                `Error caused by this value: ${e.target.value}`,
                            );
                        }
                        onChange(
                            e as ChangeEvent<HTMLInputElement>,
                            arrayValues,
                        );
                    }
                }}
                {...inputProps}
            />

            <div
                onClick={() => handleOpen()}
                className={`dark:bg-input/30 flex cursor-pointer justify-between bg-transparent px-1.5 py-[0.470rem] transition-all duration-300 ${styles?.selectClasses ?? "text-primary w-full rounded-md border sm:text-sm"}`}
            >
                <div
                    className="flex w-full items-center justify-between"
                    role={"listbox"}
                    aria-expanded={isOpen}
                    aria-activedescendant={
                        selected.length ? selected[0].value : undefined
                    }
                >
                    {selected.length > 0 ? (
                        <div className="flex flex-wrap items-center gap-1">
                            {selected.map((option, index) => (
                                <div
                                    className="flex flex-wrap gap-1"
                                    key={index}
                                >
                                    <Badge
                                        onClick={(e) =>
                                            handleRemoveFromSelected(e, option)
                                        }
                                    >
                                        {option.label}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p
                            className={
                                placeHolder ?? "transition-opacity duration-300"
                            }
                        >
                            {placeHolder ?? `Select ${label} ...`}
                        </p>
                    )}
                    <div className="flex items-center gap-2">
                        {isLoading ||
                            (creating && (
                                <div className="">
                                    {styles?.loadingIcon ? (
                                        styles.loadingIcon()
                                    ) : (
                                        <LoadingSpinner className="text-primary h-full w-full" />
                                    )}
                                </div>
                            ))}
                        {selected.length > 0 && clearable && (
                            <XMark
                                className="text-primary h-5 w-5 transition-transform duration-300 hover:scale-110"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelected([]);
                                }}
                            />
                        )}
                        <ChevronDown
                            className={`text-primary h-5 w-5 font-extrabold transition-transform duration-300 ${isOpen && "rotate-180"}`}
                        />
                    </div>
                </div>
                <div
                    className={`absolute left-0 z-50 overflow-y-scroll transition-all duration-300 ${
                        isOpen
                            ? "scale-100 opacity-100"
                            : "pointer-events-none scale-95 opacity-0"
                    } ${styles?.dropDownItemsContainerClasses ?? "bg-popover w-full rounded-lg border px-3 pb-3 shadow-2xl"}`}
                    style={{
                        top: `${(fullContainer?.current?.clientHeight ?? 0) + 5}px`,
                        maxHeight: `${styles?.dropDownContainerMaxHeight ?? "200"}px`,
                        overflowY: "scroll",
                    }}
                    onScroll={(e) => handleDataScrolling(e)}
                >
                    <div className={`sticky top-1 bg-inherit`}>
                        <Input
                            className={`${styles?.searchInputClasses ?? " "} text-primary my-2 w-full p-1 transition-shadow duration-300`}
                            onClick={(e) => handleClickingOnSearchInput(e)}
                            onChange={(e) => handleSearchChange(e)}
                            value={search ?? ""}
                            name={"search-box"}
                            type={"search"}
                            placeholder={"Type here for search or create ..."}
                        />
                    </div>

                    {items.map((item, index) => (
                        <div
                            key={index}
                            className={`transition-colors duration-300 ${
                                include(getOption(item), selected)
                                    ? `${styles?.selectedDropDownItemClasses ?? "bg-foreground text-secondary"}`
                                    : `${styles?.dropDownItemClasses ?? "hover:bg-foreground text-primary hover:text-secondary my-1 w-full cursor-pointer rounded-md p-2"}`
                            } ${styles?.dropDownItemClasses ?? "hover:bg-foreground text-primary hover:text-secondary my-1 w-full cursor-pointer rounded-md p-2"}`}
                            onClick={(e) => handleChoseItem(e, item)}
                        >
                            {renderItem
                                ? renderItem(item, getOption(item), index)
                                : (getOption(item).label ?? "")}
                        </div>
                    ))}

                    {onCreateOption && search && (
                        <Button
                            type={"button"}
                            className={"mt-2 w-full"}
                            onClick={handleCreateOption}
                            disabled={creating || !search}
                        >
                            {createButtonText} "{search}"
                            {creating && <LoadingSpinner className="ml-2" />}
                        </Button>
                    )}

                    {isLoading && (
                        <div className="text-primary my-2 flex w-full items-center justify-center transition-opacity duration-300">
                            Loading ...
                        </div>
                    )}
                </div>
            </div>
            {error && <p className="text-destructive min-h-5">{error}</p>}
            {errors &&
                isMultiple &&
                selected.length > 0 &&
                name &&
                Object.entries(errors).map(([key, value]) => {
                    if (key.startsWith(name)) {
                        return (
                            <p className="text-destructive min-h-5">{value}</p>
                        );
                    }
                })}
        </div>
    );
}

const include = (option: Option, selected: Option[]): boolean =>
    selected.filter((op) => isEqual(op, option)).length > 0;

export default CreatableApiSelect;
