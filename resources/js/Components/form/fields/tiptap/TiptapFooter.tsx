import { GetEditor } from "@/Components/form/fields/tiptap/TiptapButtons";

const TiptapFooter = () => {
    const editor = GetEditor();
    return (
        <div className={"w-full flex justify-between items-center mt-3"}>
            <div className={"flex items-center gap-2 justify-self-end"}>
                <span>
                    {editor.storage.characterCount.characters()} Character
                </span>
                /<span>{editor.storage.characterCount.words()} Word</span>
            </div>
        </div>
    );
};

export default TiptapFooter;
