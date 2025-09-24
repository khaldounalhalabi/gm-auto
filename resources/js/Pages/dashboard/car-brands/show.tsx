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
            title="CarBrand Details"
            actions={
                <div className="flex justify-between items-center">
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
            <div className="gap-5 grid grid-cols-1 md:grid-cols-2">
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
