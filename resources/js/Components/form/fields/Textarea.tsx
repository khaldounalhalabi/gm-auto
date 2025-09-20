import { Label } from "@/Components/ui/shadcn/label";
import { Textarea as ShadcnTextarea } from "@/Components/ui/shadcn/textarea";
import { usePage } from "@inertiajs/react";
import React from "react";

export interface TextareaProps extends React.ComponentProps<"textarea"> {
    name: string;
    label?: string;
    className?: string;
    required?: boolean;
}

const Textarea: React.FC<TextareaProps> = ({
    name,
    label,
    required = false,
    ...props
}) => {
    const errors = usePage().props.errors;
    const error = name && errors[name] ? errors[name] : undefined;

    return (
        <div className={"grid w-full items-center gap-3"}>
            <Label htmlFor={`${name}_id`}>
                {label}
                {required && (
                    <span className="text-sm text-destructive">*</span>
                )}
            </Label>
            <ShadcnTextarea
                id={`${name}_id`}
                rows={4}
                name={name ?? ""}
                {...props}
            />
            {error && <p className={"text-sm text-destructive"}>{error}</p>}
        </div>
    );
};

export default Textarea;
