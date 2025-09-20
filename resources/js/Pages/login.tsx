import Form from "@/Components/form/Form";
import Input from "@/Components/form/fields/Input";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/shadcn/card";
import { Link, useForm } from "@inertiajs/react";
import { FormEvent } from "react";

const Login = () => {
    const { post, setData, processing } = useForm<{
        email: string;
        password: string;
    }>();

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route("v1.web.public.login"));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                    Enter your email and password below to login to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form
                    onSubmit={onSubmit}
                    processing={processing}
                    buttonText={"Login"}
                    backButton={false}
                >
                    <div className="flex flex-col gap-6">
                        <Input
                            name="email"
                            onChange={(e) => setData("email", e.target.value)}
                            label={"Email"}
                            required={true}
                            type="email"
                            placeholder={"john@email.com"}
                        />

                        <Input
                            name="password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            label={"Password"}
                            required={true}
                            type="password"
                            placeholder={"password"}
                        />
                    </div>
                </Form>
            </CardContent>
        </Card>
    );
};

export default Login;
