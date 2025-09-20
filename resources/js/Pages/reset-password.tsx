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

const ResetPassword = () => {
    const { post, setData, processing, transform } = useForm<{
        reset_password_code: string;
        password: string;
        password_confirmation: string;
    }>();

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        transform((data) => ({
            ...data,
            reset_password_code:
                window.localStorage.getItem("password_reset_code") ?? "",
        }));
        post(route("v1.web.public.reset.password"), {
            onSuccess: () => {
                window.localStorage.removeItem("password_reset_code");
            },
            onError: (errors) => {
                console.log(errors);
            },
        });
    };
    return (
        <Card>
            <CardHeader>
                <CardTitle>You have 1 step left</CardTitle>
                <CardDescription>
                    Please enter your new password
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form
                    onSubmit={onSubmit}
                    processing={processing}
                    backButton={false}
                >
                    <Input
                        label={"New Password"}
                        name="password"
                        type="password"
                        onChange={(e) => {
                            setData("password", e.target.value);
                        }}
                        required={true}
                        autoComplete={"new-password"}
                    />

                    <Input
                        label={"Password Confirmation"}
                        name="password_confirmation"
                        type="password"
                        onChange={(e) => {
                            setData("password_confirmation", e.target.value);
                        }}
                        autoComplete={"new-password"}
                        required={true}
                    />
                </Form>
            </CardContent>
        </Card>
    );
};

export default ResetPassword;
