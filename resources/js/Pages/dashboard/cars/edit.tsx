import Input from "@/Components/form/fields/Input";
import ApiSelect from "@/Components/form/fields/selects/ApiSelect";
import Form from "@/Components/form/Form";
import PageCard from "@/Components/ui/PageCard";
import Car from "@/Models/Car";
import CarBrand from "@/Models/CarBrand";
import Client from "@/Models/Client";
import Http from "@/Modules/Http/Http";
import { useForm } from "@inertiajs/react";
import { FormEvent } from "react";

const Edit = ({ car }: { car: Car }) => {
    const { post, setData, processing } = useForm<{
        _method?: "PUT" | "POST";
        model_name: string;
        car_brand_id: number;
        client_id: number;
        registration_plate: string;
    }>({
        _method: "PUT",
        model_name: car?.model_name,
        registration_plate: car?.registration_plate,
        car_brand_id: car?.car_brand_id,
        client_id: car?.client_id,
    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route("v1.web.protected.cars.update", car.id));
    };

    return (
        <PageCard title="Edit Car">
            <Form onSubmit={onSubmit} processing={processing}>
                <div
                    className={`grid grid-cols-1 md:grid-cols-2 gap-5 items-start`}
                >
                    <Input
                        name="model_name"
                        label={"Model Name"}
                        type={"text"}
                        onChange={(e) => setData("model_name", e.target?.value)}
                        defaultValue={car.model_name}
                        required
                    />
                    <Input
                        name="registration_plate"
                        label={"Registration Plate"}
                        type={"text"}
                        onChange={(e) =>
                            setData("registration_plate", e.target?.value)
                        }
                        defaultValue={car.registration_plate}
                        required
                    />
                    <ApiSelect
                        name="carbrand_id"
                        label={"Brand"}
                        api={(page, search) =>
                            Http.make<CarBrand[]>().get(
                                route("v1.web.protected.car.brands.data"),
                                { page: page, search: search },
                            )
                        }
                        getDataArray={(response) => response?.data ?? []}
                        getIsLast={(data) =>
                            data?.paginate?.is_last_page ?? false
                        }
                        getTotalPages={(data) =>
                            data?.paginate?.total_pages ?? 0
                        }
                        onChange={(e) =>
                            setData("car_brand_id", Number(e.target.value ?? 0))
                        }
                        optionLabel={"name"}
                        optionValue={"id"}
                        defaultValue={car?.car_brand}
                        required
                        renderItem={(item, option) => (
                            <div
                                className={
                                    "flex bg-transparent w-full items-center justify-between"
                                }
                            >
                                <span>{option.label}</span>
                                <img
                                    src={item.image_url}
                                    width={"30px"}
                                    alt={`Car Brand (${option.label}) Logo`}
                                />
                            </div>
                        )}
                    />
                    <ApiSelect
                        name="client_id"
                        label={"Client"}
                        api={(page, search) =>
                            Http.make<Client[]>().get(
                                route("v1.web.protected.clients.data"),
                                { page: page, search: search },
                            )
                        }
                        getDataArray={(response) => response?.data ?? []}
                        getIsLast={(data) =>
                            data?.paginate?.is_last_page ?? false
                        }
                        getTotalPages={(data) =>
                            data?.paginate?.total_pages ?? 0
                        }
                        onChange={(e) =>
                            setData("client_id", Number(e.target.value))
                        }
                        optionLabel={"full_name"}
                        optionValue={"id"}
                        defaultValue={car?.client}
                        required
                    />
                </div>
            </Form>
        </PageCard>
    );
};

export default Edit;
