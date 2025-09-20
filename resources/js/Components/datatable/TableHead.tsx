import { TableHeadProps } from "@/Components/datatable/DataTableUtils";
import ChevronDown from "@/Components/icons/ChevronDown";
import ChevronUp from "@/Components/icons/ChevronUp";
import {
    TableHead as ShadcnTableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/shadcn/table";

function TableHead<Data>({
    schema,
    sortDir,
    setSortDir,
    sortCol,
    setSortCol,
}: TableHeadProps<Data>) {
    return (
        <TableHeader className="ltr:text-left rtl:text-right">
            <TableRow>
                {schema.map((header, index) => (
                    <ShadcnTableHead
                        key={index}
                        onClick={() => {
                            if (header.name && header.sortable) {
                                setSortDir((prevState) => {
                                    if (prevState == "asc") {
                                        return "desc";
                                    } else return "asc";
                                });

                                setSortCol(header.name as string);
                            }
                        }}
                        className={
                            header.headerProps?.className ??
                            `whitespace-nowrap py-2 font-medium ${
                                header.sortable ? "cursor-pointer" : ""
                            }`
                        }
                        {...header.headerProps}
                    >
                        <span
                            className={`flex items-center justify-start gap-2`}
                        >
                            {typeof header.label == "function"
                                ? header.label()
                                : header.label}

                            {header.sortable && (
                                <span className={`flex flex-col gap-0`}>
                                    <ChevronUp
                                        className={`h-3 w-3 ${
                                            sortDir == "asc" &&
                                            sortCol == header.name
                                                ? "fill-primary"
                                                : ""
                                        }`}
                                    />
                                    <ChevronDown
                                        className={`h-3 w-3 ${
                                            sortDir == "desc" &&
                                            sortCol == header.name
                                                ? "fill-primary"
                                                : ""
                                        }`}
                                    />
                                </span>
                            )}
                        </span>
                    </ShadcnTableHead>
                ))}
            </TableRow>
        </TableHeader>
    );
}

export default TableHead;
