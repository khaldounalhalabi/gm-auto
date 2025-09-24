import Form from "@/Components/form/Form";
import Input from "@/Components/form/fields/Input";
import PageCard from "@/Components/ui/PageCard";
import { useForm } from "@inertiajs/react";
import { FormEvent } from "react";

const Create = () => {
    const { post, setData, processing } = useForm<{
        _method?: "PUT" | "POST";
        full_name: string;
        phone: string;
    }>();

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route("v1.web.protected.clients.store"));
    };

    return (
        <PageCard title="Add New Client">
            <Form onSubmit={onSubmit} processing={processing}>
                <div
                    className={`grid grid-cols-1 md:grid-cols-2 gap-5 items-start`}
                >
                    <Input
                        name="full_name"
                        label={"Full Name"}
                        type={"text"}
                        onChange={(e) => setData("full_name", e.target?.value)}
                        required
                    />
                    <Input
                        name="phone"
                        label={"Phone"}
                        type={"tel"}
                        onChange={(e) => setData("phone", e.target?.value)}
                        required
                    />
                </div>
            </Form>
        </PageCard>
    );
};

export default Create;
