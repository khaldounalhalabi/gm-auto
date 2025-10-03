import Input from "@/Components/form/fields/Input";
import ApiSelect from "@/Components/form/fields/selects/ApiSelect";
import Textarea from "@/Components/form/fields/Textarea";
import Form from "@/Components/form/Form";
import PageCard from "@/Components/ui/PageCard";
import Car from "@/Models/Car";
import Client from "@/Models/Client";
import Visit from "@/Models/Visit";
import Http from "@/Modules/Http/Http";
import { useForm } from "@inertiajs/react";
import { ChangeEvent, FormEvent, useState } from "react";

const Edit = ({ visit }: { visit: Visit }) => {
    const [clientId, setClientId] = useState<undefined | number>(undefined);
    const { post, setData, processing } = useForm<{
        _method?: "PUT" | "POST";
        date: string;
        car_id: number;
        client_id: number;
        fault_description?: string;
        repair_description?: string;
        cost: number;
    }>({
        _method: "PUT",
        date: visit?.date,
        fault_description: visit?.fault_description,
        repair_description: visit?.repair_description,
        car_id: visit?.car_id,
        client_id: visit?.client_id,
        cost: visit?.cost,
    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route("v1.web.protected.visits.update", visit.id));
    };

    return (
        <PageCard title="Edit Visit">
            <Form onSubmit={onSubmit} processing={processing}>
                <div
                    className={`grid grid-cols-1 md:grid-cols-2 gap-5 items-start`}
                >
                    <Input
                        name="date"
                        label={"Date"}
                        type={"date"}
                        onChange={(e) => setData("date", e.target?.value)}
                        defaultValue={visit.date}
                        required
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
                        defaultValue={visit?.client}
                        required
                    />

                    <ApiSelect
                        name="car_id"
                        label={"Car"}
                        api={(page, search) =>
                            Http.make<Car[]>().get(
                                route("v1.web.protected.cars.data"),
                                {
                                    page: page,
                                    search: search,
                                    client_id: clientId ?? "",
                                },
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
                            setData("car_id", Number(e.target.value))
                        }
                        optionLabel={"model_name"}
                        optionValue={"id"}
                        defaultValue={visit?.car}
                        required
                        onSelect={(v) => v && setClientId(v.id)}
                    />
                    <div className="md:col-span-2">
                        <Textarea
                            name="fault_description"
                            label={"Fault Description"}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                                setData("fault_description", e.target.value)
                            }
                            defaultValue={visit.fault_description}
                        />
                    </div>
                    <div className="md:col-span-2">
                        <Textarea
                            name="repair_description"
                            label={"Repair Description"}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                                setData("repair_description", e.target.value)
                            }
                            defaultValue={visit.repair_description}
                        />
                    </div>
                </div>
            </Form>
        </PageCard>
    );
};

export default Edit;
