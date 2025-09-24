import ActionsButtons from "@/Components/datatable/ActionsButtons";
import DataTable from "@/Components/datatable/DataTable";
import Car from "@/Models/Car";
import Http from "@/Modules/Http/Http";
import { Link } from "@inertiajs/react";

const Index = ({ exportables }: { exportables: string[] }) => {
    return (
        <DataTable
            title="Car Table"
            createUrl={route("v1.web.protected.cars.create")}
            importRoute={route("v1.web.protected.cars.import")}
            exportRoute={route("v1.web.protected.cars.export")}
            importExampleRoute={route("v1.web.protected.cars.import.example")}
            exportables={exportables}
            getDataArray={(res) => res.data}
            getTotalPages={(res) => res?.paginate?.total_pages ?? 0}
            getTotalRecords={(res) => res.paginate?.total ?? 0}
            api={(
                page?: number | undefined,
                search?: string | undefined,
                sortCol?: string | undefined,
                sortDir?: string | undefined,
                perPage?: number | undefined,
                params?: object | undefined,
            ) =>
                Http.make<Car[]>().get(route("v1.web.protected.cars.data"), {
                    page: page,
                    search: search,
                    sort_col: sortCol,
                    sort_dir: sortDir,
                    limit: perPage,
                    ...params,
                })
            }
            schema={[
                {
                    name: "id",
                    label: "ID",
                    sortable: true,
                },
                { name: "model_name", label: "Model Name", sortable: true },
                {
                    name: "registration_plate",
                    label: "Registration Plate",
                    sortable: true,
                },
                {
                    name: "carBrand.name",
                    label: "CarBrand Name",
                    render: (cell, record, setHidden, revalidate) => {
                        return (
                            record?.car_brand && (
                                <Link
                                    className="hover:text-primary underline"
                                    href={route(
                                        "v1.web.protected.car.brands.show",
                                        record?.car_brand_id,
                                    )}
                                >
                                    {record?.car_brand?.name}
                                </Link>
                            )
                        );
                    },
                },
                {
                    name: "client.full_name",
                    label: "Client Full Name",
                    render: (cell, record, setHidden, revalidate) => {
                        return (
                            record?.client_id && (
                                <Link
                                    className="hover:text-primary underline"
                                    href={route(
                                        "v1.web.protected.clients.show",
                                        record?.client_id,
                                    )}
                                >
                                    {record?.client?.full_name}
                                </Link>
                            )
                        );
                    },
                },
                {
                    label: "Options",
                    render: (_data, record, setHidden, revalidate) => (
                        <ActionsButtons
                            buttons={["delete", "edit", "show"]}
                            baseUrl={route("v1.web.protected.cars.index")}
                            id={record?.id ?? 0}
                            setHidden={setHidden}
                        />
                    ),
                },
            ]}
        />
    );
};

export default Index;
