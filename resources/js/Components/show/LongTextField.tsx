import "@/Components/form/fields/tiptap/tiptap.css";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/Components/ui/shadcn/card";

const LongTextField = ({
    label,
    value,
    className,
    code = false,
}: {
    label?: string;
    value?: string;
    className?: string;
    code?: boolean;
}) => {
    return (
        <Card className={className ?? "my-2"}>
            <CardHeader>
                <CardTitle>{label}</CardTitle>
            </CardHeader>
            <CardContent>
                {code ? (
                    <code
                        className="whitespace-pre-wrap"
                        style={{
                            wordBreak: "break-word",
                        }}
                    >
                        {value}
                    </code>
                ) : (
                    <div
                        style={{
                            all: "unset",
                        }}
                        dangerouslySetInnerHTML={{
                            __html: value ?? "",
                        }}
                    />
                )}
            </CardContent>
        </Card>
    );
};

export default LongTextField;
