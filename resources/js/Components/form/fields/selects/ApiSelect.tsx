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

function ApiSelect<TResponse, TData>({
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
    creatable,
    onCreatePress,
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
        if (onSelect) {
            onSelect(item, selected, setSelected, e);
        } else {
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
            className={`relative grid grid-cols-1 w-full items-center gap-3 duration-300 select-none`}
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
                        let arrayValues: [];
                        try {
                            arrayValues = JSON.parse(e.target.value);
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
                className={`transition-all dark:bg-input/30 bg-transparent duration-300 flex px-1.5 py-[0.470rem] cursor-pointer justify-between ${styles?.selectClasses ?? "w-full rounded-md border text-primary sm:text-sm"}`}
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
                        {isLoading && (
                            <div className="">
                                {styles?.loadingIcon ? (
                                    styles.loadingIcon()
                                ) : (
                                    <LoadingSpinner className="text-primary h-full w-full" />
                                )}
                            </div>
                        )}
                        {selected.length > 0 && clearable && (
                            <XMark
                                className="h-5 w-5 text-primary transition-transform duration-300 hover:scale-110"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelected([]);
                                }}
                            />
                        )}
                        <ChevronDown
                            className={`h-5 w-5 font-extrabold text-primary transition-transform duration-300 ${isOpen && "rotate-180"}`}
                        />
                    </div>
                </div>
                <div
                    className={`absolute left-0 z-50 overflow-y-scroll transition-all duration-300 ${
                        isOpen
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-95 pointer-events-none"
                    } ${styles?.dropDownItemsContainerClasses ?? "w-full rounded-lg border bg-popover px-3 pb-3 shadow-2xl"}`}
                    style={{
                        top: `${(fullContainer?.current?.clientHeight ?? 0) + 5}px`,
                        maxHeight: `${styles?.dropDownContainerMaxHeight ?? "200"}px`,
                        overflowY: "scroll",
                    }}
                    onScroll={(e) => handleDataScrolling(e)}
                >
                    <div className={`sticky top-1 bg-inherit`}>
                        <Input
                            className={`${styles?.searchInputClasses ?? " "} my-2 w-full p-1 text-primary transition-shadow duration-300`}
                            onClick={(e) => handleClickingOnSearchInput(e)}
                            onChange={(e) => handleSearchChange(e)}
                            value={search ?? ""}
                            name={"search-box"}
                            type={"search"}
                            placeholder={"Search ..."}
                        />
                    </div>

                    {items.map((item, index) => (
                        <div
                            key={index}
                            className={`transition-colors duration-300 ${
                                include(getOption(item), selected)
                                    ? `${styles?.selectedDropDownItemClasses ?? "bg-foreground text-secondary"}`
                                    : `${styles?.dropDownItemClasses ?? "my-1 w-full cursor-pointer rounded-md p-2 hover:bg-foreground text-primary hover:text-secondary"}`
                            } ${styles?.dropDownItemClasses ?? "my-1 w-full cursor-pointer rounded-md p-2 hover:bg-foreground text-primary hover:text-secondary"}`}
                            onClick={(e) => handleChoseItem(e, item)}
                        >
                            {getOption(item).label ?? ""}
                        </div>
                    ))}

                    {creatable && (
                        <Button
                            type={"button"}
                            className={"w-full"}
                            onClick={() => {
                                if (onCreatePress) {
                                    setCreating(true);
                                    onCreatePress(
                                        search,
                                        inputRef,
                                        revalidate,
                                        items,
                                        setItems,
                                    ).then(() => {
                                        setCreating(false);
                                    });
                                }
                            }}
                        >
                            {"Add"}{" "}
                            {creating && <LoadingSpinner />}
                        </Button>
                    )}

                    {isLoading && (
                        <div className="text-primary my-2 flex w-full items-center justify-center transition-opacity duration-300">
                            Loading ...
                        </div>
                    )}
                </div>
            </div>
            {error && <p className="min-h-5 text-destructive">{error}</p>}
            {errors &&
                isMultiple &&
                selected.length > 0 &&
                name &&
                Object.entries(errors).map(([key, value]) => {
                    if (key.startsWith(name)) {
                        return (
                            <p className="min-h-5 text-destructive">{value}</p>
                        );
                    }
                })}
        </div>
    );
}

const include = (option: Option, selected: Option[]): boolean =>
    selected.filter((op) => isEqual(op, option)).length > 0;

export default ApiSelect;
