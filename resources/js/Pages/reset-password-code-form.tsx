import Form from "@/Components/form/Form";
import Input from "@/Components/form/fields/Input";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/shadcn/card";
import { useForm } from "@inertiajs/react";
import { FormEvent } from "react";

const ResetPasswordCodeForm = () => {
    const { post, setData, processing, data } = useForm<{
        reset_password_code: string;
    }>();

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("v1.web.public.validate.reset.password.code"), {
            onSuccess: () => {
                window.localStorage.setItem(
                    "password_reset_code",
                    data?.reset_password_code,
                );
            },
        });
    };
    return (
        <Card>
            <CardHeader>
                <CardTitle>Please check your email form a message from us !</CardTitle>
                <CardDescription>Enter the reset code received within the email below</CardDescription>
            </CardHeader>
            <CardContent>
                <Form
                    backButton={false}
                    buttonText={"Submit the code"}
                    onSubmit={onSubmit}
                    processing={processing}
                >
                    <Input
                        label={"Password Reset Code"}
                        name={"reset_password_code"}
                        required={true}
                        onChange={(e) => {
                            setData("reset_password_code", e.target.value);
                        }}
                        type="text"
                        placeholder={"code ...."}
                    />
                </Form>
            </CardContent>
        </Card>
    );
};

export default ResetPasswordCodeForm;
