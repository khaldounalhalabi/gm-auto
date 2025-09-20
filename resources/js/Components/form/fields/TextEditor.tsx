import TiptapEditor from "@/Components/form/fields/tiptap/TiptapEditor";
import { Label } from "@/Components/ui/shadcn/label";
import { MiddlewareProps } from "@/types";
import { usePage } from "@inertiajs/react";
import { Editor } from "@tiptap/react";
import React from "react";

export interface TextEditorProps {
    name: string;
    label?: string;
    required?: boolean;
    onChange?: (value: string) => void;
    defaultValue?: string;
    extraButtons?: (editor: Editor) => React.ReactNode;
}

const TextEditor: React.FC<TextEditorProps> = ({
    name,
    label,
    required = false,
    onChange,
    defaultValue,
    extraButtons,
}) => {
    const { errors, can_use_ai: withAi } = usePage<MiddlewareProps>().props;
    const error = name && errors[name] ? errors[name] : undefined;

    return (
        <Label className={"flex flex-col items-start"}>
            <span>{label}</span>
            <TiptapEditor
                extraButtons={extraButtons}
                onChange={onChange}
                defaultValue={defaultValue}
            />
            {error && <p className={"text-sm text-destructive"}>{error}</p>}
        </Label>
    );
};

export default TextEditor;
