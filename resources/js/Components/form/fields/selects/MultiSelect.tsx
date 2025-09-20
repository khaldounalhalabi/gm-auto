import { Badge } from "@/Components/ui/shadcn/badge";
import { Button } from "@/Components/ui/shadcn/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/Components/ui/shadcn/dropdown-menu";
import { Label } from "@/Components/ui/shadcn/label";
import { MiddlewareProps } from "@/types";
import { usePage } from "@inertiajs/react";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ISelectProps {
    placeholder?: string;
    options: string[];
    defaultValues?: string[];
    onChange?: (values: string[]) => void;
    label?: string;
    translated?: boolean;
    name?: string;
}

const MultiSelect = ({
    placeholder,
    options,
    defaultValues,
    onChange,
    label,
    translated = false,
    name,
}: ISelectProps) => {
    const errors = usePage<MiddlewareProps>().props?.errors;
    const [selectedItems, setSelectedItems] = useState<string[]>(
        defaultValues ?? [],
    );
    const triggerRef = useRef<HTMLButtonElement>(null);

    const handleSelectChange = (value: string) => {
        if (!selectedItems.includes(value)) {
            setSelectedItems((prev) => [...prev, value]);
        } else {
            const referencedArray = [...selectedItems];
            const indexOfItemToBeRemoved = referencedArray.indexOf(value);
            referencedArray.splice(indexOfItemToBeRemoved, 1);
            setSelectedItems(referencedArray);
        }
    };

    const isOptionSelected = (value: string): boolean =>
        selectedItems.includes(value);

    useEffect(() => {
        if (onChange) {
            onChange(selectedItems);
        }
    }, [selectedItems]);

    return (
        <div className={"grid w-full items-center gap-3"}>
            {label && <Label>{label}</Label>}
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="w-full">
                    <Button
                        variant="outline"
                        className="w-full flex items-center justify-between"
                        ref={triggerRef}
                    >
                        {selectedItems?.length <= 0 && (
                            <div>
                                {placeholder ?? "Select items"}
                            </div>
                        )}

                        {selectedItems?.length > 0 && (
                            <div
                                className={"flex items-center flex-wrap gap-1"}
                            >
                                {selectedItems?.length > 3 ? (
                                    <>
                                        {selectedItems
                                            ?.slice(0, 3)
                                            .map((v, index) => (
                                                <Badge key={index}>
                                                    {v}
                                                </Badge>
                                            ))}
                                        {`And ${selectedItems.length - 3} others`}
                                    </>
                                ) : (
                                    selectedItems?.map((v, index) => (
                                        <Badge key={index}>
                                            {v}
                                        </Badge>
                                    ))
                                )}
                            </div>
                        )}
                        <ChevronDown className="h-4 w-4 opacity-50" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className={"w-full"}
                    style={{
                        width: triggerRef.current
                            ? `${triggerRef.current.offsetWidth}px` // Match trigger width
                            : "auto",
                    }}
                >
                    <DropdownMenuCheckboxItem
                        onSelect={(e) => e.preventDefault()}
                        checked={false}
                        onCheckedChange={() => setSelectedItems([])}
                    >
                        Select items
                    </DropdownMenuCheckboxItem>
                    {options.map((value: string, index: number) => {
                        return (
                            <DropdownMenuCheckboxItem
                                onSelect={(e) => e.preventDefault()}
                                key={index}
                                checked={isOptionSelected(value)}
                                onCheckedChange={() =>
                                    handleSelectChange(value)
                                }
                            >
                                {value}
                            </DropdownMenuCheckboxItem>
                        );
                    })}
                </DropdownMenuContent>
            </DropdownMenu>
            {name && errors?.[name] && (
                <p className={"text-sm text-destructive"}>{errors[name]}</p>
            )}
        </div>
    );
};

export default MultiSelect;
