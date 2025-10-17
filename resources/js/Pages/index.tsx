import { Button } from "@/Components/ui/shadcn/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/Components/ui/shadcn/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/shadcn/table";
import { Link, usePage } from "@inertiajs/react";
import { CarFront, Users, Wrench, Calendar } from "lucide-react";

interface StatsCardProps {
    title: string;
    value: string | number;
    description?: string;
    icon: React.ReactNode;
    className?: string;
}

const StatsCard = ({
    title,
    value,
    description,
    icon,
    className,
}: StatsCardProps) => {
    return (
        <Card className={className}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <div className="text-primary h-8 w-8">{icon}</div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {description && (
                    <p className="text-muted-foreground mt-1 text-xs">
                        {description}
                    </p>
                )}
            </CardContent>
        </Card>
    );
};

interface PageProps {
    stats: {
        totalClients: number;
        totalCars: number;
        totalVisits: number;
        recentVisits: {
            id: number;
            date: string;
            client: { id: number; full_name: string };
            car: { id: number; model_name: string; registration_plate: string };
            total_cost: number;
        }[];
        topClients: {
            id: number;
            full_name: string;
            visit_count: number;
            total_spent: number;
        }[];
        upcomingMOTs: {
            car_id: number;
            model_name: string;
            registration_plate: string;
            client_id: number;
            client_name: string;
            client_phone: string;
            last_scan_date: string | null;
            expiry_date: string | null;
        }[];
    };
}
const Index = ({ stats }: PageProps) => {
    return (
        <div className={"flex flex-col items-start gap-5 p-5"}>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>

            {/* Stats Overview */}
            <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-3">
                <StatsCard
                    title="Total Clients"
                    value={stats?.totalClients || 0}
                    icon={<Users className="h-6 w-6" />}
                />
                <StatsCard
                    title="Total Cars"
                    value={stats?.totalCars || 0}
                    icon={<CarFront className="h-6 w-6" />}
                />
                <StatsCard
                    title="Total Visits"
                    value={stats?.totalVisits || 0}
                    icon={<Wrench className="h-6 w-6" />}
                />
            </div>

            {/* MOT Schedule Table */}
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        MOT Scans Due This Week
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {stats?.upcomingMOTs?.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Car</TableHead>
                                    <TableHead>Registration Plate</TableHead>
                                    <TableHead>Client</TableHead>
                                    <TableHead>Phone Number</TableHead>
                                    <TableHead>MOT Expiry Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {stats.upcomingMOTs.map((mot) => (
                                    <TableRow key={mot.car_id}>
                                        <TableCell className="font-medium">
                                            <Link
                                                href={route(
                                                    "v1.web.protected.cars.show",
                                                    mot.car_id,
                                                )}
                                                className="text-primary hover:underline"
                                            >
                                                <Button size={"sm"}>
                                                    {mot.model_name}
                                                </Button>
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            {mot.registration_plate}
                                        </TableCell>
                                        <TableCell>
                                            <Link
                                                href={route(
                                                    "v1.web.protected.clients.show",
                                                    mot.client_id,
                                                )}
                                                className="text-primary hover:underline"
                                            >
                                                <Button
                                                    size={"sm"}
                                                    variant={"outline"}
                                                >
                                                    {mot.client_name}
                                                </Button>
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            {mot.client_phone}
                                        </TableCell>
                                        <TableCell>
                                            {mot.expiry_date
                                                ? new Date(
                                                      mot.expiry_date,
                                                  ).toLocaleDateString()
                                                : "Not set"}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <p className="text-muted-foreground py-4 text-center">
                            No MOT scans due this week
                        </p>
                    )}
                </CardContent>
            </Card>

            {/* Recent Visits and Top Clients */}
            <div className="mt-4 grid w-full gap-4 md:grid-cols-2">
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Recent Visits</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {stats?.recentVisits?.length > 0 ? (
                                stats.recentVisits.map((visit) => (
                                    <div
                                        key={visit.id}
                                        className="flex items-center justify-between border-b pb-2"
                                    >
                                        <div>
                                            <Link
                                                href={route(
                                                    "v1.web.protected.clients.show",
                                                    visit.client.id,
                                                )}
                                            >
                                                <Button
                                                    className="p-0"
                                                    variant={"link"}
                                                >
                                                    <p className="font-medium">
                                                        {visit.client.full_name}
                                                    </p>
                                                </Button>
                                            </Link>
                                            <p className="text-muted-foreground text-sm">
                                                {visit.car.model_name} (
                                                {visit.car.registration_plate})
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium">
                                                ${visit.total_cost}
                                            </p>
                                            <p className="text-muted-foreground text-sm">
                                                {new Date(
                                                    visit.date,
                                                ).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-muted-foreground">
                                    No recent visits
                                </p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Top Clients */}
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Top Clients</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {stats?.topClients?.length > 0 ? (
                                stats.topClients.map((client) => (
                                    <div
                                        key={client.id}
                                        className="flex items-center justify-between border-b pb-2"
                                    >
                                        <div>
                                            <Link
                                                href={route(
                                                    "v1.web.protected.clients.show",
                                                    client.id,
                                                )}
                                            >
                                                <Button
                                                    className="p-0"
                                                    variant={"link"}
                                                >
                                                    <p className="font-medium">
                                                        {client.full_name}
                                                    </p>
                                                </Button>
                                            </Link>
                                            <p className="text-muted-foreground text-sm">
                                                {client.visit_count} visits
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium">
                                                ${client.total_spent}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-muted-foreground">
                                    No client data available
                                </p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Index;
