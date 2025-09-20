import Eye from "@/Components/icons/Eye";
import LoadingSpinner from "@/Components/icons/LoadingSpinner";
import Pencil from "@/Components/icons/Pencil";
import Trash from "@/Components/icons/Trash";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/Components/ui/shadcn/alert-dialog";
import { Button } from "@/Components/ui/shadcn/button";
import Http from "@/Modules/Http/Http";
import { Link } from "@inertiajs/react";
import React, { useState } from "react";
import { toast } from "sonner";

export type ActionButtonsTypes = "delete" | "edit" | "show";

export interface ActionsButtonsProps<Data extends Record<string, any>> {
    data?: Data;
    id?: number | string;
    buttons: ActionButtonsTypes[];
    children?: React.JSX.Element | undefined | React.ReactNode;
    baseUrl: string;
    deleteUrl?: string;
    editUrl?: string;
    showUrl?: string;
    setHidden?: (value: ((prevState: number[]) => number[]) | number[]) => void;
}

function ActionsButtons<Data extends Record<string, any>>({
    data,
    id,
    buttons,
    baseUrl,
    deleteUrl,
    showUrl,
    editUrl,
    setHidden,
    children,
}: ActionsButtonsProps<Data>) {
    const [deleting, setDeleting] = useState(false);

    const dataId = id ?? data?.id ?? undefined;

    const dUrl = deleteUrl ?? `${baseUrl}/${dataId ?? ""}`; // delete url
    const sUrl = showUrl ?? `${baseUrl}/${dataId ?? ""}`; // show url
    const eUrl = editUrl ?? `${baseUrl}/${dataId ?? ""}/edit` + ""; // edit url

    const handleDelete = async () => {
        setDeleting(true);
        await Http.make<boolean>()
            .delete(dUrl)
            .then((res) => {
                if (res.ok()) {
                    toast.success(`Deleted Successfully !`);
                    if (setHidden) {
                        setHidden((prevState) => [dataId, ...prevState]);
                    }
                } else {
                    toast.error("Error while deleting");
                }
            })
            .catch((e) => {
                toast.error("Error while deleting");
                console.error(e);
            });
        setDeleting(false);
    };

    return (
        <div className={`flex items-center justify-start gap-3`}>
            {buttons.includes("show") && (
                <Link href={sUrl}>
                    <Button variant={"default"} type={"button"} size={"icon"}>
                        <Eye />
                    </Button>
                </Link>
            )}
            {buttons.includes("edit") && (
                <Link href={eUrl}>
                    <Button size={"icon"} variant={"secondary"} type={"button"}>
                        <Pencil className="h-5 w-5" />
                    </Button>
                </Link>
            )}

            {buttons.includes("delete") && (
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            type={"button"}
                            size={"icon"}
                            variant={"destructive"}
                        >
                            {deleting ? <LoadingSpinner /> : <Trash />}
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                {"Are you sure you want to delete this item?"}
                            </AlertDialogTitle>
                            <AlertDialogDescription></AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>
                                {"No"}
                            </AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() => {
                                    handleDelete();
                                }}
                            >
                                {"Yes, delete it!"}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
            {children}
        </div>
    );
}

export default ActionsButtons;
