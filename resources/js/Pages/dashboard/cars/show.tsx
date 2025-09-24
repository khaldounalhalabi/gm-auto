import SmallTextField from "@/Components/show/SmallTextField";
import PageCard from "@/Components/ui/PageCard";
import { Button } from "@/Components/ui/shadcn/button";
import Car from "@/Models/Car";
import { Link } from "@inertiajs/react";

const Show = ({ car }: { car: Car }) => {
    return (
        <PageCard
            title="Car Details"
            actions={
                <div className="flex justify-between items-center">
                    <Link href={route("v1.web.protected.cars.edit", car.id)}>
                        <Button>Edit</Button>
                    </Link>
                </div>
            }
        >
            <div className="gap-5 grid grid-cols-1 md:grid-cols-2">
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
        </PageCard>
    );
};

export default Show;
