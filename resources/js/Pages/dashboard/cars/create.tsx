import Input from "@/Components/form/fields/Input";
import ApiSelect from "@/Components/form/fields/selects/ApiSelect";
import Form from "@/Components/form/Form";
import PageCard from "@/Components/ui/PageCard";
import CarBrand from "@/Models/CarBrand";
import Client from "@/Models/Client";
import Http from "@/Modules/Http/Http";
import HTTP from "@/Modules/Http/Http";
import { useForm } from "@inertiajs/react";
import { FormEvent } from "react";
import CreatableApiSelect from "@/Components/form/fields/selects/CreatableApiSelect";

const Create = () => {
    const { post, setData, processing } = useForm<{
        _method?: "PUT" | "POST";
        model_name: string;
        car_brand_id: number;
        client_id: number;
        registration_plate: string;
    }>();

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route("v1.web.protected.cars.store"));
    };

    return (
        <PageCard title="Add New Car">
            <Form onSubmit={onSubmit} processing={processing}>
                <div
                    className={`grid grid-cols-1 items-start gap-5 md:grid-cols-2`}
                >
                    <Input
                        name="model_name"
                        label={"Model Name"}
                        type={"text"}
                        onChange={(e) => setData("model_name", e.target?.value)}
                        required
                    />
                    <Input
                        name="registration_plate"
                        label={"Registration Plate"}
                        type={"text"}
                        onChange={(e) =>
                            setData("registration_plate", e.target?.value)
                        }
                        required
                    />
                    <CreatableApiSelect
                        name="car_brand_id"
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
                        required
                        renderItem={(item, option) => (
                            <div
                                className={
                                    "flex w-full items-center justify-between bg-transparent"
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
                        onCreateOption={async (v) => {
                            const response = await HTTP.make<CarBrand>().post(
                                route("v1.ajax.protected.cars.brands.store"),
                                {
                                    name: v,
                                },
                            );

                            if (response.ok() && response.data) {
                                return response.data;
                            }

                            throw new Error("Failed to create brand", {
                                cause: response.message,
                            });
                        }}
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
                            setData("client_id", Number(e.target.value ?? 0))
                        }
                        optionLabel={"full_name"}
                        optionValue={"id"}
                        required
                    />
                </div>
            </Form>
        </PageCard>
    );
};

export default Create;
