"use client";
import { Badge } from "@/Components/ui/shadcn/badge";
import React, { HTMLProps, ReactNode } from "react";

interface ValueProps extends HTMLProps<HTMLDivElement> {
    value?: any;
    children?: ReactNode;
}

export const Value: React.FC<ValueProps> = ({
    value,
    children,
    className,
    ...props
}) => {
    let showedValue = value;
    if (value === undefined || value === null) {
        showedValue = <Badge>{"No data"}</Badge>;
    } else if (value === 0 || Number.isNaN(value)) {
        showedValue = 0;
    } else if (value === false) {
        showedValue = "false";
    } else if (value === "") {
        showedValue = <Badge>{"No data"}</Badge>;
    } else if (
        typeof value == "string" &&
        (value?.includes("undefined") || value?.includes("null"))
    ) {
        showedValue = <Badge>{"No data"}</Badge>;
    } else if (typeof value == "string" && value.includes("NaN")) {
        showedValue = 0;
    }

    return (
        <div
            className={
                className ??
                `text-start text-primary text-xs font-normal md:text-base`
            }
            {...props}
        >
            {!children ? <span>{showedValue}</span> : children}
        </div>
    );
};
