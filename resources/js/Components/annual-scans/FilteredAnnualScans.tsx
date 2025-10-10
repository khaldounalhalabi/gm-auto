import React from "react";
import Car from "@/Models/Car";
import Client from "@/Models/Client";
import DataTable from "@/Components/datatable/DataTable";
import Http from "@/Modules/Http/Http";
import AnnualScan from "@/Models/AnnualScan";
import { Badge } from "@/Components/ui/shadcn/badge";
import { Link } from "@inertiajs/react";
import ActionsButtons from "@/Components/datatable/ActionsButtons";

const FilteredAnnualScans = ({
    car,
    client,
}: {
    car?: Car;
    client?: Client;
}) => {
    const url = car
        ? route("v1.web.protected.cars.annual.scans", car?.id ?? 0)
        : route("v1.web.protected.clients.annual.scans", client?.id ?? 0);

    return (
        <DataTable
            title="Annual Scans"
            createUrl={route("v1.web.protected.annual.scans.create")}
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
                Http.make<AnnualScan[]>().get(url, {
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
                { name: "scan_date", label: "Scan Date", sortable: true },
                { name: "expiry_date", label: "Expiry Date", sortable: true },
                {
                    name: "is_passed",
                    label: "Is Passed ?",
                    sortable: true,
                    render: (cell) => {
                        return cell ? (
                            <Badge variant={"success"}>Yes</Badge>
                        ) : (
                            <Badge variant={"destructive"}>No</Badge>
                        );
                    },
                },
                { name: "cost", label: "Cost", sortable: true },
                car
                    ? {
                          name: "client.full_name",
                          label: "Client",
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
                      }
                    : {
                          name: "car.model_name",
                          label: "Car Model Name",
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
                                          {record?.car?.model_name}-
                                          {record?.car?.registration_plate}
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
                            baseUrl={route(
                                "v1.web.protected.annual.scans.index",
                            )}
                            id={record?.id ?? 0}
                            setHidden={setHidden}
                        />
                    ),
                },
            ]}
        />
    );
};

export default FilteredAnnualScans;
