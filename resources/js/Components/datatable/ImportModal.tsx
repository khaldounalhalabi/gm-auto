import Input from "@/Components/form/fields/Input";
import ArrowDownTray from "@/Components/icons/ArrowDownTray";
import LoadingSpinner from "@/Components/icons/LoadingSpinner";
import Modal from "@/Components/ui/Modal";
import { Button } from "@/Components/ui/shadcn/button";
import DownloadFile from "@/Hooks/DownloadFile";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

const ImportModal = ({
    revalidate,
    importRoute,
    importExampleRoute,
}: {
    revalidate: () => void;
    importRoute: string;
    importExampleRoute?: string;
}) => {
    const [openImport, setOpenImport] = useState(false);

    const { post, setData, processing } = useForm<{
        excel_file?: File;
    }>();

    const { isLoading, downloadFile } = DownloadFile();

    const onSubmit = () => {
        post(importRoute, {
            onSuccess: () => {
                if (!processing && !isLoading) {
                    revalidate();
                    setOpenImport(false);
                    setData("excel_file", undefined);
                }
            },
        });
    };
    return (
        <Modal
            isOpen={openImport}
            trigger={
                <Button
                    type={"button"}
                    size={"icon"}
                    variant={"success"}
                    onClick={() => {
                        setOpenImport(true);
                    }}
                >
                    <ArrowDownTray />
                </Button>
            }
            onClose={() => {
                setOpenImport(false);
            }}
            footer={
                <div className="flex items-center gap-2">
                    <Button
                        type={"button"}
                        variant={"destructive"}
                        onClick={() => {
                            setOpenImport(false);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button disabled={processing} onClick={onSubmit}>
                        Import
                        {processing && <LoadingSpinner />}
                    </Button>
                    {importExampleRoute && (
                        <Button
                            variant={"secondary"}
                            type="button"
                            onClick={async () => {
                                await downloadFile(() =>
                                    fetch(importExampleRoute),
                                );
                                setOpenImport(false);
                            }}
                            disabled={isLoading}
                        >
                            Get import example
                            {isLoading && <LoadingSpinner />}
                        </Button>
                    )}
                </div>
            }
            title={"Import from excel file"}
        >
            <form>
                <label className={"dark:text-white"}>
                    Excel File
                    <Input
                        name={"excel_file"}
                        type="file"
                        onChange={(e) => {
                            setData("excel_file", e.target.files?.[0]);
                        }}
                    />
                </label>
            </form>
        </Modal>
    );
};

export default ImportModal;
