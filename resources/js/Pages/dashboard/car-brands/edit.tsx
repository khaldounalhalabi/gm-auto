import Form from "@/Components/form/Form";
import Input from "@/Components/form/fields/Input";
import PageCard from "@/Components/ui/PageCard";
import CarBrand from "@/Models/CarBrand";
import { useForm } from "@inertiajs/react";
import { FormEvent } from "react";

const Edit = ({ carBrand }: { carBrand: CarBrand }) => {
    const { post, setData, processing } = useForm<{
        _method?: "PUT" | "POST";
        name: string;
        image_url?: string;
    }>({
        _method: "PUT",
        name: carBrand?.name,
        image_url: carBrand?.image_url,
    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route("v1.web.protected.car.brands.update", carBrand.id));
    };

    return (
        <PageCard title="Edit CarBrand">
            <Form onSubmit={onSubmit} processing={processing}>
                <div
                    className={`grid grid-cols-1 md:grid-cols-2 gap-5 items-start`}
                >
                    <Input
                        name="name"
                        label={"Name"}
                        type={"text"}
                        onChange={(e) => setData("name", e.target?.value)}
                        defaultValue={carBrand.name}
                        required
                    />
                </div>
            </Form>
        </PageCard>
    );
};

export default Edit;
