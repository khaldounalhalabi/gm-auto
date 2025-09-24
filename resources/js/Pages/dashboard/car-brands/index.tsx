import ActionsButtons from "@/Components/datatable/ActionsButtons";
import DataTable from "@/Components/datatable/DataTable";
import ImagePreview from "@/Components/show/ImagePreview";
import CarBrand from "@/Models/CarBrand";
import Http from "@/Modules/Http/Http";

const Index = ({ exportables }: { exportables: string[] }) => {
    return (
        <DataTable
            title="CarBrand Table"
            createUrl={route("v1.web.protected.car.brands.create")}
            importRoute={route("v1.web.protected.car.brands.import")}
            exportRoute={route("v1.web.protected.car.brands.export")}
            importExampleRoute={route(
                "v1.web.protected.car.brands.import.example",
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
                Http.make<CarBrand[]>().get(
                    route("v1.web.protected.car.brands.data"),
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
                { name: "name", label: "Name", sortable: true },
                {
                    name: "image_url",
                    label: "Image Url",
                    sortable: true,
                    render: (url) => (
                        <div className={"max-w-10"}>
                            <ImagePreview src={url} />
                        </div>
                    ),
                },
                {
                    label: "Options",
                    render: (_data, record, setHidden, revalidate) => (
                        <ActionsButtons
                            buttons={["delete", "edit", "show"]}
                            baseUrl={route("v1.web.protected.car.brands.index")}
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
