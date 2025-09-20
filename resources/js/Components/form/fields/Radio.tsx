import { Label } from "@/Components/ui/shadcn/label";
import { RadioGroup, RadioGroupItem } from "@/Components/ui/shadcn/radio-group";
import { usePage } from "@inertiajs/react";
import React from "react";

interface IRadioProps {
    name: string;
    items: { label?: string; value: string | number }[];
    checked?: ((value: string | number) => boolean) | string;
    onChange?: (e: string | number) => void;
    label?: string;
}

const Radio: React.FC<IRadioProps> = ({
    name,
    items = [],
    checked = undefined,
    onChange = undefined,
    label = undefined,
}) => {
    const errors = usePage().props.errors;
    const error = name && errors?.[name] ? errors[name] : undefined;
    const defaultValue = checked
        ? typeof checked == "function"
            ? items?.filter((i) => checked(i.value))?.[0]?.value
            : checked
        : undefined;

    return (
        <div className={"grid gap-5 w-full items-start"}>
            {label && <Label htmlFor={`${name}_id`}>{label}</Label>}
            <RadioGroup
                onValueChange={onChange}
                defaultValue={defaultValue?.toString()}
                className={"flex flex-row items-center gap-2 flex-wrap"}
                id={`${name}_${label}_id`}
            >
                {items.map((i) => (
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem
                            value={i.value?.toString()}
                            id={i.label + "_" + i.value + "_" + "_id"}
                        />
                        <Label htmlFor={i.label + "_" + i.value + "_" + "_id"}>
                            {i.label}
                        </Label>
                    </div>
                ))}
            </RadioGroup>
            {error ? <p className={"text-sm text-red-700"}>{error}</p> : ""}
        </div>
    );
};

export default Radio;
