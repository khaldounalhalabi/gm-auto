import { Input as ShadcnInput } from "@/Components/ui/shadcn/input";
import { Label } from "@/Components/ui/shadcn/label";
import { usePage } from "@inertiajs/react";
import React, { ChangeEvent } from "react";

export interface InputProps extends React.ComponentProps<"input"> {
    name: string;
    label?: string;
    placeholder?: string;
    defaultValue?: any;
    className?: string;
    onInput?: (e: ChangeEvent<HTMLInputElement>) => void;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

const Input: React.FC<InputProps> = ({
    name,
    label,
    type,
    defaultValue,
    className,
    placeholder = "",
    required = false,
    ...props
}) => {
    const errors = usePage().props.errors;

    return (
        <div className={`grid w-full items-center gap-3`}>
            {label && (
                <Label htmlFor={`${name}_id`}>
                    {label}
                    {required && <span className={"text-destructive"}>*</span>}
                </Label>
            )}

            <ShadcnInput
                type={type ?? "text"}
                defaultValue={defaultValue}
                className={className}
                placeholder={placeholder}
                required={required}
                name={name}
                {...props}
            />
            {errors[name] && (
                <p className={"text-sm text-destructive"}>{errors[name]}</p>
            )}
        </div>
    );
};

export default Input;
