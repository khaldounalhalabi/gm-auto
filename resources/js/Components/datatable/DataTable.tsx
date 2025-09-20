import { DataTableData } from "@/Components/datatable/DataTableUtils";
import ExportModal from "@/Components/datatable/ExportModal";
import FilterModal from "@/Components/datatable/FilterModal";
import ImportModal from "@/Components/datatable/ImportModal";
import TableBody from "@/Components/datatable/TableBody";
import TableHead from "@/Components/datatable/TableHead";
import TablePaginator from "@/Components/datatable/TablePaginator";
import Select from "@/Components/form/fields/selects/Select";
import DocumentPlus from "@/Components/icons/DocumentPlus";
import PageCard from "@/Components/ui/PageCard";
import { Button } from "@/Components/ui/shadcn/button";
import { Input } from "@/Components/ui/shadcn/input";
import {
    Table,
    TableBody as ShadcnTableBody,
    TableCell,
    TableRow,
} from "@/Components/ui/shadcn/table";
import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";

function DataTable<ApiResponse, Data>({
    api,
    schema,
    createUrl,
    filter,
    title,
    getDataArray,
    getTotalPages,
    getNextPage = undefined,
    getPreviousPage = undefined,
    getTotalRecords = undefined,
    isFirst = undefined,
    isLast = undefined,
    importExampleRoute = undefined,
    importRoute = undefined,
    exportRoute = undefined,
    exportables = undefined,
    extraButtons = undefined,
}: DataTableData<ApiResponse, Data>) {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [hideCols, setHideCols] = useState<number[]>([]);
    const [perPage, setPerPage] = useState(10);
    const [params, setParams] = useState({});
    const [tempParams, setTempParams] = useState({});
    const [openFilter, setOpenFilter] = useState(false);
    const [sortDir, setSortDir] = useState("asc");
    const [sortCol, setSortCol] = useState("");
    const [refetch, setRefetch] = useState(false);
    const [items, setItems] = useState<Data[]>([]);
    const [isPending, setIsPending] = useState(false);
    const [response, setApiResponse] = useState<ApiResponse>();

    const revalidate = () => {
        setRefetch((prevState) => !prevState);
    };

    const fetchFromApi = async () => {
        setIsPending(true);

        let s = !search || search == "" ? undefined : search;
        let sortD = !sortDir || sortDir == "" ? undefined : sortDir;
        let sortC = !sortCol || sortCol == "" ? undefined : sortCol;

        const res = await api(page, s, sortC, sortD, perPage, params);
        setApiResponse(res);
        setItems(getDataArray(res) ?? []);
        setIsPending(false);
    };

    useEffect(() => {
        fetchFromApi();
    }, [page, search, sortDir, sortCol, perPage, params, refetch]);

    return (
        <PageCard title={title}>
            <div className={`my-2 flex w-full items-center justify-between`}>
                <div className={"flex gap-1"}>
                    {createUrl && (
                        <Link href={createUrl}>
                            <Button
                                size={"icon"}
                                type={"button"}
                                variant={"default"}
                            >
                                <DocumentPlus />
                            </Button>
                        </Link>
                    )}
                    {filter && (
                        <FilterModal
                            onClick={() => {
                                setOpenFilter(true);
                            }}
                            open={openFilter}
                            onClose={() => {
                                setOpenFilter(false);
                            }}
                            element={filter(tempParams, setTempParams)}
                            onReset={() => {
                                setTempParams({});
                                setParams({});
                                setOpenFilter(false);
                            }}
                            onApply={() => {
                                setParams(tempParams);
                                setOpenFilter(false);
                            }}
                        />
                    )}
                    {importRoute && (
                        <ImportModal
                            revalidate={revalidate}
                            importRoute={importRoute}
                            importExampleRoute={importExampleRoute}
                        />
                    )}
                    {exportRoute && (
                        <ExportModal
                            exportables={exportables}
                            exportRoute={exportRoute}
                            schema={schema}
                        />
                    )}
                    {extraButtons && extraButtons(revalidate)}
                </div>
                <div className={"flex gap-2"}>
                    <Select
                        data={["10", "25", "50", "75", "500"]}
                        onChange={(e) => {
                            setPage(1);
                            setSearch("");
                            setPerPage(parseInt(e));
                        }}
                        selected={"10"}
                    />

                    <Input
                        type="search"
                        id="Search"
                        placeholder={"Search For ..."}
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                    />
                </div>
            </div>

            <Table className="relative overflow-x-scroll min-w-full scroll-my-0 overflow-y-hidden text-sm">
                <TableHead
                    schema={schema}
                    setSortDir={setSortDir}
                    setSortCol={setSortCol}
                    sortDir={sortDir}
                    sortCol={sortCol}
                />
                {isPending ? (
                    <ShadcnTableBody>
                        <TableRow>
                            <TableCell
                                colSpan={schema.length}
                                className={"p-3 text-center"}
                            >
                                Loading ...
                            </TableCell>
                        </TableRow>
                    </ShadcnTableBody>
                ) : (
                    <TableBody
                        data={items}
                        tableSchema={schema}
                        hidden={hideCols}
                        setHidden={setHideCols}
                        revalidate={revalidate}
                    />
                )}
            </Table>

            <TablePaginator
                key={"next-page"}
                response={response ?? ({} as ApiResponse)}
                page={page}
                setPage={setPage}
                getTotalPages={getTotalPages}
                getNextPage={getNextPage}
                getPreviousPage={getPreviousPage}
                getTotalRecords={getTotalRecords}
                isFirst={isFirst}
                isLast={isLast}
            />
        </PageCard>
    );
}

export default DataTable;
