import Client from "@/Models/Client";
import Http from "@/Modules/Http/Http";
import DataTable from "@/Components/datatable/DataTable";
import ActionsButtons from "@/Components/datatable/ActionsButtons";

const Index = ({ exportables }: { exportables: string[] }) => {
    return (
        <DataTable
            title="Clients"
            createUrl={route("v1.web.protected.clients.create")}
            importRoute={route("v1.web.protected.clients.import")}
            exportRoute={route("v1.web.protected.clients.export")}
            importExampleRoute={route(
                "v1.web.protected.clients.import.example",
            )}
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
                Http.make<Client[]>().get(
                    route("v1.web.protected.clients.data"),
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
                { name: "full_name", label: "Full Name", sortable: true },
                { name: "phone", label: "Phone", sortable: true },
                {
                    label: "Options",
                    render: (_data, record, setHidden, revalidate) => (
                        <ActionsButtons
                            buttons={["delete", "edit", "show"]}
                            baseUrl={route("v1.web.protected.clients.index")}
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
