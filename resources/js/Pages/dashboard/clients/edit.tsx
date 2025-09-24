import Form from "@/Components/form/Form";
import Input from "@/Components/form/fields/Input";
import PageCard from "@/Components/ui/PageCard";
import Client from "@/Models/Client";
import { useForm } from "@inertiajs/react";
import { FormEvent } from "react";

const Edit = ({ client }: { client: Client }) => {
    const { post, setData, processing } = useForm<{
        _method?: "PUT" | "POST";
        full_name: string;
        phone: string;
    }>({ _method: "PUT", full_name: client?.full_name, phone: client?.phone });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route("v1.web.protected.clients.update", client.id));
    };

    return (
        <PageCard title="Edit Client">
            <Form onSubmit={onSubmit} processing={processing}>
                <div
                    className={`grid grid-cols-1 md:grid-cols-2 gap-5 items-start`}
                >
                    <Input
                        name="full_name"
                        label={"Full Name"}
                        type={"text"}
                        onChange={(e) => setData("full_name", e.target?.value)}
                        defaultValue={client.full_name}
                        required
                    />
                    <Input
                        name="phone"
                        label={"Phone"}
                        type={"tel"}
                        onChange={(e) => setData("phone", e.target?.value)}
                        defaultValue={client.phone}
                        required
                    />
                </div>
            </Form>
        </PageCard>
    );
};

export default Edit;
