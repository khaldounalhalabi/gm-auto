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
import AnnualScan from "@/Models/AnnualScan";

const Edit = ({ annualScan }: { annualScan: AnnualScan }) => {
    const [clientId, setClientId] = useState<number | undefined>(undefined);
    const { post, setData, processing } = useForm<{
        _method?: "PUT" | "POST";
        client_id: number;
        car_id: number;
        scan_date: string;
        is_passed: boolean;
        cost: number;
        test_report?: string;
        notes?: string;
    }>({
        _method: "PUT",
        scan_date: annualScan?.scan_date,
        is_passed: annualScan?.is_passed,
        cost: annualScan?.cost,
        test_report: annualScan?.test_report,
        notes: annualScan?.notes,
        client_id: annualScan?.client_id,
        car_id: annualScan?.car_id,
    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route("v1.web.protected.annual.scans.update", annualScan.id));
    };

    return (
        <PageCard title="Edit Annual Scan">
            <Form onSubmit={onSubmit} processing={processing}>
                <div
                    className={`grid grid-cols-1 items-start gap-5 md:grid-cols-2`}
                >
                    <Input
                        name="scan_date"
                        label={"Scan Date"}
                        type={"date"}
                        onChange={(e) => setData("scan_date", e.target?.value)}
                        defaultValue={annualScan.scan_date}
                        required
                    />
                    <Radio
                        name="is_passed"
                        items={[
                            { label: "Yes", value: "true" },
                            { label: "No", value: "false" },
                        ]}
                        onChange={(e) => setData("is_passed", e == "true")}
                        checked={(val) => val == String(annualScan.is_passed)}
                        label={"Passed ?"}
                    />
                    <Input
                        name="cost"
                        label={"Cost"}
                        type={"number"}
                        onChange={(e) =>
                            setData("cost", e.target?.valueAsNumber)
                        }
                        defaultValue={annualScan.cost}
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
                            setClientId(
                                e.target.value
                                    ? Number(e.target.value)
                                    : undefined,
                            );
                        }}
                        optionLabel={"full_name"}
                        optionValue={"id"}
                        defaultValue={annualScan?.client}
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
                        onChange={(e) => {
                            setData("car_id", Number(e.target.value));
                        }}
                        optionLabel={"model_name"}
                        optionValue={"id"}
                        defaultValue={annualScan?.car}
                        required
                        revalidateKey={clientId}
                    />
                    <div className="md:col-span-2">
                        <TextEditor
                            name="test_report"
                            label={"Test Report"}
                            onChange={(e) => setData("test_report", e)}
                            defaultValue={annualScan.test_report}
                        />
                    </div>
                    <div className="md:col-span-2">
                        <TextEditor
                            name="notes"
                            label={"Notes"}
                            onChange={(e) => setData("notes", e)}
                            defaultValue={annualScan.notes}
                        />
                    </div>
                </div>
            </Form>
        </PageCard>
    );
};

export default Edit;
