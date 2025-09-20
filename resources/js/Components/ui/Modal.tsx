import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/shadcn/dialog";
import { ReactNode, useEffect, useState } from "react";

const Modal = ({
    isOpen,
    onClose,
    children,
    trigger,
    title,
    description,
    footer,
}: {
    isOpen?: boolean;
    onClose?: () => void;
    children?: ReactNode;
    trigger?: ReactNode | (() => ReactNode);
    title?: string;
    description?: string;
    footer?: ReactNode | (() => ReactNode);
}) => {
    const [show, setShow] = useState(isOpen ?? false);

    const onOpenChange = (state: boolean) => {
        if (!state && onClose) {
            onClose();
        }
        setShow(state);
    };

    useEffect(() => {
        if (isOpen != undefined) {
            setShow(isOpen);
        }
    }, [isOpen]);

    return (
        <Dialog open={show} onOpenChange={onOpenChange}>
            {trigger && (
                <DialogTrigger asChild>
                    {typeof trigger == "function" ? trigger() : trigger}
                </DialogTrigger>
            )}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title ?? ""}</DialogTitle>
                    <DialogDescription>{description ?? ""}</DialogDescription>
                </DialogHeader>
                {children}
                {footer && (
                    <DialogFooter>
                        {typeof footer == "function" ? footer() : footer}
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default Modal;
