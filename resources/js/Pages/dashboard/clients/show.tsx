import SmallTextField from "@/Components/show/SmallTextField";
import PageCard from "@/Components/ui/PageCard";
import { Button } from "@/Components/ui/shadcn/button";
import Client from "@/Models/Client";
import { Link } from "@inertiajs/react";

const Show = ({ client }: { client: Client }) => {
    return (
        <PageCard
            title="Client Details"
            actions={
                <div className="flex justify-between items-center">
                    <Link
                        href={route("v1.web.protected.clients.edit", client.id)}
                    >
                        <Button>Edit</Button>
                    </Link>
                </div>
            }
        >
            <div className="gap-5 grid grid-cols-1 md:grid-cols-2">
                <SmallTextField label="Full Name" value={client.full_name} />
                <SmallTextField label="Phone" value={client.phone} />
            </div>
        </PageCard>
    );
};

export default Show;
