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

const ForgetPassword = () => {
    const { post, setData, processing } = useForm<{
        email: string;
    }>();

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("v1.web.public.request.reset.password"));
    };
    return (
        <Card>
            <CardHeader>
                <CardTitle>Forget your password ?</CardTitle>
                <CardDescription>
                    Enter your email so we can send you a reset password code
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form
                    onSubmit={onSubmit}
                    processing={processing}
                    backButton={false}
                    buttonText={"Send Code"}
                >
                    <Input
                        name={"email"}
                        onChange={(e) => setData("email", e.target.value)}
                        label={"Email"}
                        required={true}
                        type="email"
                        placeholder={"email@example.com"}
                    />
                </Form>
            </CardContent>
        </Card>
    );
};

export default ForgetPassword;
