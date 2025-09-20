import { TablePaginatorProps } from "@/Components/datatable/DataTableUtils";
import ChevronLeft from "@/Components/icons/ChevronLeft";
import ChevronRight from "@/Components/icons/ChevronRight";
import { Button } from "@/Components/ui/shadcn/button";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
} from "@/Components/ui/shadcn/pagination";

function TablePaginator<ApiResponse>({
    response,
    page,
    setPage,
    getTotalPages,
    getNextPage,
    getPreviousPage,
    getTotalRecords = undefined,
    isFirst = undefined,
    isLast = undefined,
}: TablePaginatorProps<ApiResponse>) {
    const paginationArray = [...Array(getTotalPages(response) ?? 0)];

    const setNextPage = () => {
        if (getNextPage) {
            setPage(getNextPage(response, page));
        } else {
            setPage((old) => old + 1);
        }
    };

    const setPrevPage = () => {
        if (getPreviousPage) {
            setPage(getPreviousPage(response, page));
        } else {
            setPage((old) => Math.max(old - 1, 0));
        }
    };

    const isFirstPage = () => {
        return isFirst ? isFirst(response) : page <= 1;
    };

    const isLastPage = () => {
        return isLast ? isLast(response) : getTotalPages(response) <= page;
    };

    return (
        <div className="flex justify-between px-4 py-2 w-full">
            {getTotalRecords && (
                <div className={"justify-start w-full"}>
                    Total Records : {getTotalRecords(response)}
                </div>
            )}
            <Pagination className={"justify-end"}>
                <PaginationContent>
                    <PaginationItem className={`border-0`}>
                        <Button
                            onClick={() => setPrevPage()}
                            disabled={isFirstPage()}
                            variant={"outline"}
                            size={"icon"}
                            type={"button"}
                        >
                            <ChevronLeft />
                        </Button>
                    </PaginationItem>

                    {paginationArray.map((_e, index) => {
                        if (index < 3 || index >= paginationArray.length - 1) {
                            return (
                                <PaginationItem key={`page-${index + 1}`}>
                                    <Button
                                        onClick={() => setPage(index + 1)}
                                        variant={
                                            index + 1 == page
                                                ? "default"
                                                : "outline"
                                        }
                                        size={"icon"}
                                        type={"button"}
                                    >
                                        {index + 1}
                                    </Button>
                                </PaginationItem>
                            );
                        } else if (
                            (index === 3 && page > 5) ||
                            (index === paginationArray.length - 2 &&
                                page < paginationArray.length - 4)
                        ) {
                            return (
                                <PaginationItem key={`page-${index + 1}`}>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            );
                        } else if (index >= page - 2 && index <= page + 1) {
                            return (
                                <PaginationItem key={`page-${index + 1}`}>
                                    <Button
                                        onClick={() => setPage(index + 1)}
                                        variant={
                                            index + 1 == page
                                                ? "default"
                                                : "outline"
                                        }
                                        type={"button"}
                                        size={"icon"}
                                    >
                                        {index + 1}
                                    </Button>
                                </PaginationItem>
                            );
                        } else return null;
                    })}
                    <PaginationItem>
                        <Button
                            type={"button"}
                            onClick={() => {
                                setNextPage();
                            }}
                            disabled={isLastPage()}
                            size={"icon"}
                            variant={"outline"}
                        >
                            <ChevronRight />
                        </Button>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}

export default TablePaginator;
