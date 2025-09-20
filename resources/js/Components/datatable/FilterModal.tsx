import Filter from "@/Components/icons/Filter";
import Modal from "@/Components/ui/Modal";
import { Button } from "@/Components/ui/shadcn/button";
import React from "react";

function FilterModal({
    onClick,
    open,
    onClose,
    element,
    onReset,
    onApply,
}: {
    onClick: () => void;
    open: boolean;
    onClose: () => void;
    element: React.ReactNode | React.JSX.Element | undefined | null;
    onReset: () => void;
    onApply: () => void;
}) {
    return (
        <Modal
            trigger={
                <Button size={"icon"} variant={"secondary"} onClick={onClick}>
                    <Filter />
                </Button>
            }
            title={"Filters"}
            isOpen={open}
            onClose={onClose}
        >
            {element}
            <div className={"flex items-center justify-between w-full"}>
                <Button
                    onClick={onReset}
                    variant={"destructive"}
                    type={"button"}
                >
                    Reset Filters
                </Button>
                <Button onClick={onApply} variant={"default"} type={"button"}>
                    Apply
                </Button>
            </div>
        </Modal>
    );
}

export default FilterModal;
