import React from "react";
import Car from "@/Models/Car";
import Client from "@/Models/Client";
import DataTable from "@/Components/datatable/DataTable";
import Http from "@/Modules/Http/Http";
import Visit from "@/Models/Visit";
import { Link } from "@inertiajs/react";
import ActionsButtons from "@/Components/datatable/ActionsButtons";

const FilteredVisits = ({ car, client }: { car?: Car; client?: Client }) => {
    const url = car
        ? route("v1.web.protected.cars.visits", car.id ?? 0)
        : route("v1.web.protected.clients.visits", client?.id ?? 0);

    return (
        <DataTable
            title="Visits"
            createUrl={route("v1.web.protected.visits.create")}
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
                Http.make<Visit[]>().get(url, {
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
                { name: "date", label: "Date", sortable: true },
                client
                    ? {
                          name: "car.model_name",
                          label: "Car Model",
                          render: (_cell, record) => {
                              return (
                                  record?.car_id && (
                                      <Link
                                          className="hover:text-primary underline"
                                          href={route(
                                              "v1.web.protected.cars.show",
                                              record?.car_id,
                                          )}
                                      >
                                          {`${record?.car?.model_name} - ${record?.car?.registration_plate}`}
                                      </Link>
                                  )
                              );
                          },
                      }
                    : {
                          name: "client.full_name",
                          label: "Client Full Name",
                          render: (_cell, record) => {
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
                    name: "cost",
                    label: "Cost",
                    sortable: true,
                },
                {
                    name: "total_cost",
                    label: "Total Cost",
                    sortable: true,
                },
                {
                    label: "Options",
                    render: (_data, record, setHidden) => (
                        <ActionsButtons
                            buttons={["delete", "edit", "show"]}
                            baseUrl={route("v1.web.protected.visits.index")}
                            id={record?.id ?? 0}
                            setHidden={setHidden}
                        />
                    ),
                },
            ]}
        />
    );
};

export default FilteredVisits;
