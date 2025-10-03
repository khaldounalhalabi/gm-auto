import LongTextField from "@/Components/show/LongTextField";
import SmallTextField from "@/Components/show/SmallTextField";
import PageCard from "@/Components/ui/PageCard";
import { Button } from "@/Components/ui/shadcn/button";
import Visit from "@/Models/Visit";
import { Link } from "@inertiajs/react";

const Show = ({ visit }: { visit: Visit }) => {
    return (
        <PageCard
            title="Visit Details"
            actions={
                <div className="flex justify-between items-center">
                    <Link
                        href={route("v1.web.protected.visits.edit", visit.id)}
                    >
                        <Button>Edit</Button>
                    </Link>
                </div>
            }
        >
            <div className="gap-5 grid grid-cols-1 md:grid-cols-2">
                <SmallTextField label="Date" value={visit.date} />
                <SmallTextField label="Car" value={visit?.car?.model_name} />
                <SmallTextField
                    label="Client"
                    value={visit?.client?.full_name}
                />
                <SmallTextField label="Cost" value={visit?.cost} />
            </div>

            <LongTextField
                label="Fault Description"
                value={visit?.fault_description}
            />
            <LongTextField
                label="Repair Description"
                value={visit?.repair_description}
            />
        </PageCard>
    );
};

export default Show;
