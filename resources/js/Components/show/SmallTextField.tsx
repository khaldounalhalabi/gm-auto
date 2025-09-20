import { LabelValue } from "@/Components/ui/labels-and-values/LabelValue";

const SmallTextField = ({ label, value }: { label?: string; value?: any }) => {
    return <LabelValue label={label} value={value} />;
};

export default SmallTextField;
