import { cn } from "@/lib/utils";
import React, { HTMLProps, ReactNode } from "react";

interface LabelProps extends HTMLProps<HTMLDivElement> {
    label?: string | any;
    children?: ReactNode;
    col?: boolean;
}

export const Label: React.FC<LabelProps> = ({
    label,
    children,
    className,
    col = false,
    ...props
}) => {
    return (
        <div
            className={cn(
                `flex font-bold ${col ? "flex-col items-start gap-2" : "items-center gap-2 "} justify-start text-start w-full text-sm md:text-sm`,
                className,
            )}
            {...props}
        >
            {label ? <span>{label}:</span> : ""}
            {children}
        </div>
    );
};
