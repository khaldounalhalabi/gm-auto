import SmallTextField from "@/Components/show/SmallTextField";
import PageCard from "@/Components/ui/PageCard";
import { Button } from "@/Components/ui/shadcn/button";
import Client from "@/Models/Client";
import { Link } from "@inertiajs/react";
import Tabs from "@/Components/ui/Tabs";
import FilteredVisits from "@/Components/visits/FilteredVisits";
import FilteredAnnualScans from "@/Components/annual-scans/FilteredAnnualScans";
import CarsByClient from "@/Components/cars/CarsByClient";

const Show = ({ client }: { client: Client }) => {
    return (
        <PageCard
            title="Client Details"
            actions={
                <div className="flex items-center justify-between">
                    <Link
                        href={route("v1.web.protected.clients.edit", client.id)}
                    >
                        <Button>Edit</Button>
                    </Link>
                </div>
            }
        >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <SmallTextField label="Full Name" value={client.full_name} />
                <SmallTextField label="Phone" value={client.phone} />
            </div>
            <div className={"mt-10 w-full"}>
                <Tabs
                    tabs={[
                        {
                            title: "Cars",
                            render: () => <CarsByClient clientId={client.id} />,
                        },
                        {
                            title: "Visits",
                            render: () => <FilteredVisits client={client} />,
                        },
                        {
                            title: "Annual Scans",
                            render: () => (
                                <FilteredAnnualScans client={client} />
                            ),
                        },
                    ]}
                />
            </div>
        </PageCard>
    );
};

export default Show;
