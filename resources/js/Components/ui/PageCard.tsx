import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/shadcn/card";
import React, { ReactNode } from "react";

interface PageCardProps {
    title?: string;
    description?: string;
    children?: ReactNode;
    actions?: ReactNode | (() => ReactNode);
}

const PageCard: React.FC<PageCardProps> = ({
    title,
    description,
    children,
    actions = undefined,
}) => {
    return (
        <Card className={"mx-5"}>
            <CardHeader>
                {title && <CardTitle className={"text-xl"}>{title}</CardTitle>}
                {description && (
                    <CardDescription>{description}</CardDescription>
                )}
                {actions && (
                    <div className={"flex justify-end items-center"}>
                        {typeof actions == "function" ? actions() : actions}
                    </div>
                )}
            </CardHeader>
            <CardContent>{children}</CardContent>
        </Card>
    );
};

export default PageCard;
