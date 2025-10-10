import ImagePreview from "@/Components/show/ImagePreview";
import SmallTextField from "@/Components/show/SmallTextField";
import { Label } from "@/Components/ui/labels-and-values/Label";
import PageCard from "@/Components/ui/PageCard";
import { Button } from "@/Components/ui/shadcn/button";
import CarBrand from "@/Models/CarBrand";
import { Link } from "@inertiajs/react";

const Show = ({ carBrand }: { carBrand: CarBrand }) => {
    return (
        <PageCard
            title="Car brand Details"
            actions={
                <div className="flex items-center justify-between">
                    <Link
                        href={route(
                            "v1.web.protected.car.brands.edit",
                            carBrand.id,
                        )}
                    >
                        <Button>Edit</Button>
                    </Link>
                </div>
            }
        >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <SmallTextField label="Name" value={carBrand.name} />
            </div>
            <div className={"md:grid-cols-2"}>
                <Label col label={"Logo"}>
                    <ImagePreview src={carBrand.image_url} />
                </Label>
            </div>
        </PageCard>
    );
};

export default Show;
