import React from "react";
import DataTable from "@/Components/datatable/DataTable";
import Http from "@/Modules/Http/Http";
import Car from "@/Models/Car";
import { Link } from "@inertiajs/react";
import ActionsButtons from "@/Components/datatable/ActionsButtons";

const CarsByClient = ({ clientId }: { clientId: number }) => {
    return (
        <DataTable
            title="Cars"
            createUrl={route("v1.web.protected.cars.create")}
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
                Http.make<Car[]>().get(
                    route("v1.web.protected.clients.cars", clientId),
                    {
                        page: page,
                        search: search,
                        sort_col: sortCol,
                        sort_dir: sortDir,
                        limit: perPage,
                        ...params,
                    },
                )
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
                    label: "Car Brand",
                    render: (_cell, record) => {
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
                    label: "Options",
                    render: (_data, record, setHidden) => (
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

export default CarsByClient;
