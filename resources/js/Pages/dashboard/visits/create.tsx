import Input from "@/Components/form/fields/Input";
import ApiSelect from "@/Components/form/fields/selects/ApiSelect";
import Select from "@/Components/form/fields/selects/Select";
import Textarea from "@/Components/form/fields/Textarea";
import Form from "@/Components/form/Form";
import PageCard from "@/Components/ui/PageCard";
import { Button } from "@/Components/ui/shadcn/button";
import PartSupplierType from "@/Enums/PartSupplierType";
import Car from "@/Models/Car";
import Client from "@/Models/Client";
import Part from "@/Models/Part";
import Http from "@/Modules/Http/Http";
import { useForm } from "@inertiajs/react";
import { PlusIcon, TrashIcon } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

const Create = () => {
    const [client, setClient] = useState<undefined | number>(undefined);
    const [parts, setParts] = useState<Omit<Part, "id" | "visit_id">[]>([
        {
            name: "",
            type: PartSupplierType.OTHER,
            quantity: 0,
            item_price: 0,
            invoice_number: "",
            source: "",
            notes: "",
        },
    ]);

    const [cost, setCost] = useState(0);
    const [total, setTotal] = useState(0);

    const { post, setData, processing } = useForm<{
        _method?: "PUT" | "POST";
        date: string;
        car_id: number;
        client_id: number;
        fault_description?: string;
        repair_description?: string;
        cost: number;
        parts: Omit<Part, "id" | "visit_id" | "visit">[];
    }>();

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("v1.web.protected.visits.store"));
    };

    function onPartFieldChange(
        index: number,
        key: keyof Omit<Part, "id" | "visit_id">,
        value: any,
    ) {
        const newParts = [...parts];
        newParts[index][key] = value as never;
        setParts(newParts);
        setData("parts", parts);
    }

    function removePart(index: number) {
        const newParts = [...parts];
        newParts.splice(index, 1);
        setParts(newParts);
        setData("parts", newParts);
    }

    function addPart() {
        const newParts = [
            ...parts,
            {
                name: "",
                type: PartSupplierType.OTHER,
                quantity: 1,
                item_price: 0,
                invoice_number: "",
                source: "",
                notes: "",
            },
        ];
        setParts(newParts);
        setData("parts", newParts);
    }

    useEffect(() => {
        setTotal(
            parts.reduce(
                (acc, part) => acc + part.item_price * part.quantity,
                0,
            ) + (cost ?? 0),
        );
    }, [parts, cost]);

    return (
        <PageCard title="Add New Visit">
            <Form onSubmit={onSubmit} processing={processing}>
                <div
                    className={`grid grid-cols-1 items-start gap-5 md:grid-cols-2`}
                >
                    <Input
                        name="date"
                        label={"Date"}
                        type={"date"}
                        onChange={(e) => setData("date", e.target?.value)}
                        required
                        defaultValue={new Date().toISOString().split("T")[0]}
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
                    <Input
                        name={"cost"}
                        label={"Cost"}
                        onChange={(v) => {
                            setData("cost", v.target.valueAsNumber);
                            setCost(v.target.valueAsNumber);
                        }}
                        required
                        defaultValue={0}
                        step={"any"}
                        type={"number"}
                    />
                    <div className="md:col-span-2">
                        <Textarea
                            name="fault_description"
                            label={"Fault Description"}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                                setData("fault_description", e.target.value)
                            }
                        />
                    </div>
                    <div className="md:col-span-2">
                        <Textarea
                            name="repair_description"
                            label={"Repair Description"}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                                setData("repair_description", e.target.value)
                            }
                        />
                    </div>

                    <div className="w-full md:col-span-2">
                        <div className="mb-3 flex items-center gap-3 font-bold">
                            <label>Parts</label>
                            <Button
                                type="button"
                                size={"icon"}
                                onClick={addPart}
                            >
                                <PlusIcon />
                            </Button>
                        </div>
                        <div className="flex flex-col gap-3">
                            {parts.map((field, index) => (
                                <div className="grid w-full grid-cols-2 gap-3 rounded-md border p-3">
                                    <Input
                                        name={`parts.${index}.name`}
                                        label={"Name"}
                                        onChange={(e) =>
                                            onPartFieldChange(
                                                index,
                                                "name",
                                                e.target.value,
                                            )
                                        }
                                        defaultValue={parts?.[index]?.name}
                                    />
                                    <Select
                                        data={Object.values(PartSupplierType)}
                                        onChange={(e) =>
                                            onPartFieldChange(index, "type", e)
                                        }
                                        label="Type"
                                        selected={parts?.[index]?.type}
                                        name={`parts.${index}.type`}
                                    />
                                    <Input
                                        name={`parts.${index}.quantity`}
                                        label={"Quantity"}
                                        onChange={(e) =>
                                            onPartFieldChange(
                                                index,
                                                "quantity",
                                                e.target.valueAsNumber,
                                            )
                                        }
                                        defaultValue={
                                            parts?.[index]?.quantity ?? 1
                                        }
                                        type="number"
                                        step={"any"}
                                    />
                                    <Input
                                        name={`parts.${index}.item_price`}
                                        label={"Item Price"}
                                        onChange={(e) =>
                                            onPartFieldChange(
                                                index,
                                                "item_price",
                                                e.target.valueAsNumber,
                                            )
                                        }
                                        defaultValue={
                                            parts?.[index]?.item_price
                                        }
                                        type="number"
                                        step={"any"}
                                    />

                                    <Input
                                        name={`parts.${index}.invoice_number`}
                                        label={"Invoice Number"}
                                        onChange={(e) =>
                                            onPartFieldChange(
                                                index,
                                                "invoice_number",
                                                e.target.value,
                                            )
                                        }
                                        defaultValue={
                                            parts?.[index]?.invoice_number
                                        }
                                        type={"text"}
                                    />
                                    <Input
                                        name={`parts.${index}.source`}
                                        label={"Source"}
                                        onChange={(e) =>
                                            onPartFieldChange(
                                                index,
                                                "source",
                                                e.target.value,
                                            )
                                        }
                                        defaultValue={parts?.[index]?.source}
                                    />
                                    <div className="md:col-span-2">
                                        <Textarea
                                            name={`parts.${index}.notes`}
                                            label={"Notes"}
                                            onChange={(e) =>
                                                onPartFieldChange(
                                                    index,
                                                    "notes",
                                                    e.target.value,
                                                )
                                            }
                                            defaultValue={parts?.[index]?.notes}
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <Button
                                            type="button"
                                            onClick={() => removePart(index)}
                                            className="w-full"
                                            variant={"destructive"}
                                        >
                                            Remove <TrashIcon />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center justify-between rounded-md border p-2 shadow-md md:col-span-2">
                        <label className="font-bold">Total :</label>
                        <label>{total}</label>
                    </div>
                </div>
            </Form>
        </PageCard>
    );
};

export default Create;
