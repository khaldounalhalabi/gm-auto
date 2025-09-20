"use client";

import { Label } from "@/Components/ui/shadcn/label";
import {
    Select as ShadcnSelect,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/shadcn/select";
import { usePage } from "@inertiajs/react";

const Select = ({
    data,
    selected = undefined,
    label = undefined,
    onChange,
    translated = false,
    name,
}: {
    data: any[];
    selected?: string;
    label?: string;
    onChange?: ((value: string) => void) | undefined;
    translated?: boolean;
    name?: string;
}) => {
    const errors = usePage().props.errors;
    return (
        <div
            className={"flex flex-col items-start justify-between w-full gap-3"}
        >
            {label && <Label>{label}</Label>}
            <ShadcnSelect defaultValue={selected} onValueChange={onChange}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={"Select an item"} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value={" "}>
                            {"Select an item"}
                        </SelectItem>
                        {data.map((item, index) => (
                            <SelectItem
                                value={item == "all" ? "" : item}
                                key={index}
                            >
                                {item}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </ShadcnSelect>
            {name && errors[name] && (
                <p className={"text-destructive text-sm"}>{errors[name]}</p>
            )}
        </div>
    );
};

export default Select;
