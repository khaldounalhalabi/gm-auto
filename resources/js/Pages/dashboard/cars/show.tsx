import SmallTextField from "@/Components/show/SmallTextField";
import PageCard from "@/Components/ui/PageCard";
import { Button } from "@/Components/ui/shadcn/button";
import Car from "@/Models/Car";
import { Link } from "@inertiajs/react";
import Tabs from "@/Components/ui/Tabs";
import FilteredVisits from "@/Components/visits/FilteredVisits";
import FilteredAnnualScans from "@/Components/annual-scans/FilteredAnnualScans";

const Show = ({ car }: { car: Car }) => {
    return (
        <PageCard
            title="Car Details"
            actions={
                <div className="flex items-center justify-between">
                    <Link href={route("v1.web.protected.cars.edit", car.id)}>
                        <Button>Edit</Button>
                    </Link>
                </div>
            }
        >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <SmallTextField label="Model Name" value={car.model_name} />
                <SmallTextField
                    label="Registration Plate"
                    value={car.registration_plate}
                />
                <SmallTextField
                    label="Car Brand"
                    value={car?.car_brand?.name}
                />
                <SmallTextField label="Client" value={car?.client?.full_name} />
            </div>
            <div className={"mt-10 w-full"}>
                <Tabs
                    tabs={[
                        {
                            title: "Visits",
                            render: () => <FilteredVisits car={car} />,
                        },
                        {
                            title: "Annual Scans",
                            render: () => <FilteredAnnualScans car={car} />,
                        },
                    ]}
                />
            </div>
        </PageCard>
    );
};

export default Show;
