import { Label } from "@/Components/ui/labels-and-values/Label";
import { Value } from "@/Components/ui/labels-and-values/Value";

export const LabelValue = ({
    label,
    value,
    col = false,
}: {
    label: string | any;
    value: any;
    col?: boolean;
}) => {
    return (
        <Label col={col} label={label}>
            <Value value={value} />
        </Label>
    );
};
