import LoadingSpinner from "@/Components/icons/LoadingSpinner";
import { Button } from "@/Components/ui/shadcn/button";
import { ChevronLeft } from "lucide-react";
import { FormEvent, ReactNode } from "react";

const Form = ({
    onSubmit,
    processing,
    children,
    buttonText,
    backButton = true,
    className,
}: {
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    processing?: boolean;
    children?: ReactNode;
    buttonText?: string;
    backButton?: boolean;
    className?: string;
}) => {
    if (!buttonText) {
        buttonText = "Save";
    }

    return (
        <form className={className} onSubmit={onSubmit}>
            {children}
            <div
                className={`flex items-center ${backButton ? "justify-between" : "justify-end"} mt-5 w-full`}
            >
                {backButton && (
                    <Button
                        type="button"
                        variant="outline"
                        onClick={(e) => {
                            e.preventDefault();
                            window.history.back();
                        }}
                        className={"flex items-center"}
                    >
                        <ChevronLeft />
                        {" Back"}
                    </Button>
                )}
                <Button type="submit" disabled={processing} variant={"default"}>
                    {buttonText}
                    {processing && <LoadingSpinner />}
                </Button>
            </div>
        </form>
    );
};

export default Form;
