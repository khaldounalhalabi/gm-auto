import { Label } from "@/Components/ui/labels-and-values/Label";
import Media, { getFileNameFromUrl } from "@/Models/Media";
import { MiddlewareProps } from "@/types";
import { usePage } from "@inertiajs/react";
import {
    ActualFileObject,
    FilePondInitialFile,
    ProcessServerConfigFunction,
    ServerUrl,
} from "filepond";
import "filepond-plugin-file-poster/dist/filepond-plugin-file-poster.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";
import { JSX, useState } from "react";
import { FilePond } from "react-filepond";

// @ts-ignore
function FileUploader({
    name,
    isMultiple,
    label,
    acceptedFileTypes,
    onChange,
    defaultValue,
    process,
    defaultProcess,
}: {
    name: string;
    isMultiple: true;
    label?: string;
    acceptedFileTypes?: string[];
    onChange?: (file: File[] | undefined) => void;
    defaultValue?: Media[] | Media;
    process?: string | ServerUrl | ProcessServerConfigFunction | null;
    defaultProcess?: boolean;
}): JSX.Element;

function FileUploader({
    name,
    isMultiple,
    label,
    acceptedFileTypes,
    onChange,
    defaultValue,
    process,
    defaultProcess,
}: {
    name: string;
    isMultiple?: false | undefined;
    label?: string;
    acceptedFileTypes?: string[];
    onChange?: (file: File | undefined) => void;
    defaultValue?: Media[] | Media;
    process?: string | ServerUrl | ProcessServerConfigFunction | null;
    defaultProcess?: boolean;
}): JSX.Element;

function FileUploader({
    name,
    isMultiple = false,
    label = undefined,
    acceptedFileTypes = ["image/jpeg", "image/png", "image/jpg"],
    onChange,
    defaultValue = [],
    process,
    defaultProcess = false,
}: {
    name: string;
    isMultiple?: boolean;
    label?: string;
    acceptedFileTypes?: string[];
    onChange?: (file: File | File[] | undefined) => void;
    defaultValue?: Media[] | Media;
    process?: string | ServerUrl | ProcessServerConfigFunction | null;
    defaultProcess?: boolean;
}): JSX.Element {
    defaultValue = defaultValue
        ? Array.isArray(defaultValue)
            ? defaultValue
            : [defaultValue]
        : [];

    const initialFiles: FilePondInitialFile[] | ActualFileObject[] =
        defaultValue.map((file) => {
            return {
                source: file.url,
                options: {
                    type: "local",
                    file: {
                        ...file,
                        name: getFileNameFromUrl(file?.url),
                        size: file?.size,
                        type: file?.mime_type,
                    },
                    metadata: {
                        poster: file?.url,
                    },
                },
            };
        });

    const [files, setFiles] = useState<
        FilePondInitialFile[] | ActualFileObject[]
    >(initialFiles);

    const errors = usePage<MiddlewareProps>().props?.errors;

    return (
        <Label label={label} col>
            <div className={"w-full"}>
                <FilePond
                    files={files}
                    onupdatefiles={(fileItems) => {
                        setFiles(fileItems.map((i) => i.file));
                        if (onChange) {
                            if (isMultiple) {
                                onChange(
                                    fileItems.length > 0
                                        ? (fileItems.map(
                                              (file) => file.file,
                                          ) as File[])
                                        : undefined,
                                );
                            } else {
                                fileItems.length > 0
                                    ? onChange(fileItems?.[0]?.file as File)
                                    : onChange(undefined);
                            }
                        }
                    }}
                    acceptedFileTypes={acceptedFileTypes}
                    allowMultiple={isMultiple}
                    allowFilePoster={true}
                    filePosterMaxHeight={80}
                    filePosterMinHeight={40}
                />
            </div>
            {name && errors?.[name] && (
                <p className={"text-sm text-destructive"}>{errors[name]}</p>
            )}
        </Label>
    );
}

export default FileUploader;
