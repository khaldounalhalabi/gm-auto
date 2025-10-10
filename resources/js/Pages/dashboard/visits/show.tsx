import LongTextField from "@/Components/show/LongTextField";
import SmallTextField from "@/Components/show/SmallTextField";
import { LabelValue } from "@/Components/ui/labels-and-values/LabelValue";
import PageCard from "@/Components/ui/PageCard";
import { Button } from "@/Components/ui/shadcn/button";
import Visit from "@/Models/Visit";
import { Link } from "@inertiajs/react";

const Show = ({ visit }: { visit: Visit }) => {
    return (
        <PageCard
            title="Visit Details"
            actions={
                <div className="flex items-center justify-between">
                    <Link
                        href={route("v1.web.protected.visits.edit", visit.id)}
                    >
                        <Button>Edit</Button>
                    </Link>
                </div>
            }
        >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <SmallTextField label="Date" value={visit.date} />
                <SmallTextField label="Car" value={visit?.car?.model_name} />
                <SmallTextField
                    label="Client"
                    value={visit?.client?.full_name}
                />
                <SmallTextField label="Cost" value={visit?.cost} />
                <SmallTextField label="Cost" value={visit?.total_cost} />
            </div>

            <LongTextField
                label="Fault Description"
                value={visit?.fault_description}
            />
            <LongTextField
                label="Repair Description"
                value={visit?.repair_description}
            />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                    <h2 className="text-lg font-bold">Parts :</h2>
                </div>
                {visit?.parts?.map((part) => (
                    <div
                        key={part.id}
                        className="grid grid-cols-1 gap-5 rounded-md border p-3 md:col-span-2 md:grid-cols-2"
                    >
                        <LabelValue label={"Name"} value={part.name} />
                        <LabelValue label={"Quantity"} value={part.quantity} />
                        <LabelValue
                            label={"Item Price"}
                            value={part.item_price}
                        />
                        <LabelValue
                            label={"Invoice Number"}
                            value={part.invoice_number}
                        />
                        <LabelValue label={"Source"} value={part.source} />
                        <LabelValue label={"Notes"} value={part.notes} />
                        <LabelValue label={"Type"} value={part.type} />
                    </div>
                ))}
            </div>
        </PageCard>
    );
};

export default Show;
