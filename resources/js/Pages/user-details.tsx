import Input from "@/Components/form/fields/Input";
import Form from "@/Components/form/Form";
import PageCard from "@/Components/ui/PageCard";
import Tabs from "@/Components/ui/Tabs";
import User from "@/Models/User";
import { useForm } from "@inertiajs/react";
import { FormEvent } from "react";

const UserDetails = ({ user }: { user: User }) => {
    return (
        <PageCard>
            <Tabs
                tabs={[
                    {
                        title: "Overview",
                        render: <UserOverview user={user} />,
                    },
                    {
                        title: "Edit Profile",
                        render: <EditProfile user={user} />,
                    },
                ]}
            />
        </PageCard>
    );
};

export default UserDetails;

const UserOverview = ({ user }: { user: User }) => {
    return (
        <div className="w-full p-8">
            <h2 className="text-xl font-semibold ">Profile details</h2>
            <div className="my-5 grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="flex justify-between items-center ">
                    <strong>Username :</strong>
                    <p>
                        {user.first_name} {user.last_name}
                    </p>
                </label>

                <label className="flex justify-between items-center ">
                    <strong>Email :</strong>
                    <p>{user.email}</p>
                </label>
            </div>
        </div>
    );
};

const EditProfile = ({ user }: { user: User }) => {
    const { post, setData, processing, errors } = useForm<{
        first_name?: string;
        last_name?: string;
        email?: string;
        password?: string;
        password_confirmation?: string;
        _method: "POST" | "PUT";
    }>({
        first_name: user?.first_name,
        last_name: user?.last_name,
        email: user?.email,
        _method: "PUT",
    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("v1.web.protected.me.update"));
    };

    return (
        <div className="w-full p-8">
            <h2 className="text-xl font-semibold">Edit Profile :</h2>
            <Form
                onSubmit={onSubmit}
                processing={processing}
                backButton={false}
            >
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 my-5">
                    <Input
                        name="first_name"
                        type="text"
                        label={"First Name"}
                        onChange={(e) => {
                            setData("first_name", e.target.value);
                        }}
                        defaultValue={user?.first_name}
                        className={"max-w-md"}
                    />

                    <Input
                        name="last_name"
                        type="text"
                        label={"Last Name"}
                        onChange={(e) => {
                            setData("last_name", e.target.value);
                        }}
                        defaultValue={user?.last_name}
                        className={"max-w-md"}
                    />

                    <Input
                        name="email"
                        type="email"
                        label={"Email"}
                        onChange={(e) => {
                            setData("email", e.target.value);
                        }}
                        defaultValue={user?.email}
                        className={"max-w-md"}
                    />

                    <Input
                        name="password"
                        label={"New Password"}
                        type="password"
                        onChange={(e) => {
                            setData("password", e.target.value);
                        }}
                        autoComplete={"new-password"}
                        className={"max-w-md"}
                    />

                    <Input
                        name="password_confirmation"
                        label={"Password Confirmation"}
                        type="password"
                        onChange={(e) => {
                            setData("password_confirmation", e.target.value);
                        }}
                        autoComplete={"new-password"}
                        className={"max-w-md"}
                        placeholder={"Confirm your password"}
                    />
                </div>
            </Form>
        </div>
    );
};
