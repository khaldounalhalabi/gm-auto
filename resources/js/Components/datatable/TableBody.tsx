import {
    DataTableSchema,
    TableBodyProps,
} from "@/Components/datatable/DataTableUtils";
import {
    TableBody as ShadcnTableBody,
    TableCell,
    TableRow,
} from "@/Components/ui/shadcn/table";
import { translate } from "@/Models/Translatable";
import { getNestedPropertyValue } from "@/helper";

function TableBody<Data>({
    tableSchema,
    data,
    setHidden,
    revalidate,
    hidden = [],
}: TableBodyProps<Data>) {
    if (data?.length <= 0) {
        return (
            <ShadcnTableBody>
                <TableRow>
                    <TableCell
                        colSpan={tableSchema.length}
                        className={"p-3 text-center"}
                    >
                        {"No data"}
                    </TableCell>
                </TableRow>
            </ShadcnTableBody>
        );
    }

    function renderCell<Data>(
        schema: DataTableSchema<Data>,
        index: number,
        item: any,
        setHidden?: (
            value: ((prevState: number[]) => number[]) | number[],
        ) => void,
        revalidate?: () => void,
    ) {
        let cellValue;
        if (!schema.render && schema.name) {
            if (schema?.translatable) {
                cellValue = translate(
                    getNestedPropertyValue(item, schema.name as string),
                );
            } else {
                cellValue = getNestedPropertyValue(item, schema.name as string);
            }
        } else if (schema.render && schema.name) {
            let callValue;
            if (schema?.translatable) {
                callValue = translate(
                    getNestedPropertyValue(item, schema.name as string),
                );
            } else {
                callValue = getNestedPropertyValue(item, schema.name as string);
            }
            cellValue = schema.render(callValue, item, setHidden);
        } else if (schema.render && !schema.name) {
            cellValue = schema.render(undefined, item, setHidden);
        } else {
            cellValue = "No data";
        }
        return (
            <TableCell
                key={`${schema.label} - ${index}`}
                className={schema.cellProps?.className}
                {...schema.cellProps}
            >
                {cellValue ?? "No data"}
            </TableCell>
        );
    }

    return (
        <ShadcnTableBody>
            {data
                ?.filter(
                    (item: any, index) => !hidden?.includes(item?.id ?? index),
                )
                ?.map((item: any, index: any) => (
                    <TableRow key={`${index}-${item.label}`}>
                        {tableSchema.map((schema, index) =>
                            renderCell(
                                schema,
                                index,
                                item,
                                setHidden,
                                revalidate,
                            ),
                        )}
                    </TableRow>
                ))}
        </ShadcnTableBody>
    );
}

export default TableBody;
