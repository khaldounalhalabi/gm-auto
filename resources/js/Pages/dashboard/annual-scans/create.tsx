import { useForm } from "@inertiajs/react";
import { FormEvent, useState } from "react";
import PageCard from "@/Components/ui/PageCard";
import Form from "@/Components/form/Form";
import Http from "@/Modules/Http/Http";
import Car from "@/Models/Car";
import ApiSelect from "@/Components/form/fields/selects/ApiSelect";
import Client from "@/Models/Client";
import TextEditor from "@/Components/form/fields/TextEditor";
import Input from "@/Components/form/fields/Input";
import Radio from "@/Components/form/fields/Radio";

const Create = () => {
    const [client, setClient] = useState<number | undefined>(undefined);
    const { post, setData, processing } = useForm<{
        _method?: "PUT" | "POST";
        client_id: number;
        car_id: number;
        scan_date: string;
        is_passed: boolean;
        cost: number;
        test_report?: string;
        notes?: string;
    }>();

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("v1.web.protected.annual.scans.store"));
    };

    return (
        <PageCard title="Add New AnnualScan">
            <Form onSubmit={onSubmit} processing={processing}>
                <div
                    className={`grid grid-cols-1 items-start gap-5 md:grid-cols-2`}
                >
                    <Input
                        name="scan_date"
                        label={"Scan Date"}
                        type={"date"}
                        onChange={(e) => setData("scan_date", e.target?.value)}
                        required
                    />
                    <Radio
                        name="is_passed"
                        items={[
                            { label: "Yes", value: "true" },
                            { label: "No", value: "false" },
                        ]}
                        onChange={(e) => setData("is_passed", e == "true")}
                        label={"Passed ?"}
                    />
                    <Input
                        name="cost"
                        label={"Cost"}
                        type={"number"}
                        onChange={(e) =>
                            setData("cost", e.target?.valueAsNumber)
                        }
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
                        onChange={(e) => {
                            setData("client_id", Number(e.target.value));
                            setClient(
                                e.target.value
                                    ? Number(e.target.value)
                                    : undefined,
                            );
                        }}
                        optionLabel={"full_name"}
                        optionValue={"id"}
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
                                    client_id: client ?? "",
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
                        required
                        revalidateKey={client}
                    />
                    <div className="md:col-span-2">
                        <TextEditor
                            name="test_report"
                            label={"Test Report"}
                            onChange={(e) => setData("test_report", e)}
                        />
                    </div>
                    <div className="md:col-span-2">
                        <TextEditor
                            name="notes"
                            label={"Notes"}
                            onChange={(e) => setData("notes", e)}
                        />
                    </div>
                </div>
            </Form>
        </PageCard>
    );
};

export default Create;
