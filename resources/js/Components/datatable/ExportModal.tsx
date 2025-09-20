import { DataTableSchema } from "@/Components/datatable/DataTableUtils";
import LoadingSpinner from "@/Components/icons/LoadingSpinner";
import Modal from "@/Components/ui/Modal";
import { Button } from "@/Components/ui/shadcn/button";
import DownloadFile from "@/Hooks/DownloadFile";
import Http from "@/Modules/Http/Http";
import { IconFileExcel } from "@tabler/icons-react";
import { FormEvent, useState } from "react";

const ExportModal = ({
    schema,
    exportRoute,
    exportables = undefined,
}: {
    schema: DataTableSchema<any>[];
    exportRoute?: string;
    exportables?: string[];
}) => {
    const [openExport, setOpenExport] = useState(false);
    const [cols, setCols] = useState<string[]>(
        exportables
            ? exportables
            : schema
                  .filter((col) => col.name != undefined && col.name != "id")
                  .map((c) => c.name as string),
    );
    const { isLoading, downloadFile } = DownloadFile();

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (exportRoute) {
            await downloadFile(() =>
                Http.make().file().post(exportRoute, {
                    columns: cols,
                }),
            );
            setOpenExport(false);
        }
    };

    return (
        <Modal
            isOpen={openExport}
            onClose={() => {
                setOpenExport(false);
            }}
            trigger={
                <Button
                    type={"button"}
                    variant={"outline"}
                    size={"icon"}
                    onClick={() => {
                        setOpenExport(true);
                    }}
                >
                    <IconFileExcel />
                </Button>
            }
            title={"Export To Excel"}
        >
            <form onSubmit={onSubmit}>
                <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                    {exportables
                        ? exportables.map((exp, index) => (
                              <label
                                  className="flex items-center justify-between gap-2 dark:text-white"
                                  key={index}
                              >
                                  {exp.split(".").join(" ")}
                                  <input
                                      type="checkbox"
                                      className="accent-primary rounded-md"
                                      value={exp as string}
                                      name="columns"
                                      onChange={(e) => {
                                          e.target.checked
                                              ? setCols((prev) => {
                                                    let temp = prev;
                                                    temp.push(exp as string);
                                                    return temp;
                                                })
                                              : setCols((prev) =>
                                                    prev.filter(
                                                        (c) => c != exp,
                                                    ),
                                                );
                                      }}
                                      defaultChecked={true}
                                  />
                              </label>
                          ))
                        : schema.map((item, index) =>
                              item.name && item.name != "id" ? (
                                  <label
                                      className="flex items-center justify-between gap-2"
                                      key={index}
                                  >
                                      {(item.name as string) ??
                                          (item?.label as string)}{" "}
                                      <input
                                          type="checkbox"
                                          className="rounded-md"
                                          value={item.name as string}
                                          name="columns"
                                          onChange={(e) => {
                                              e.target.checked
                                                  ? setCols((prev) => {
                                                        let temp = prev;
                                                        temp.push(
                                                            item.name as string,
                                                        );
                                                        return temp;
                                                    })
                                                  : setCols((prev) =>
                                                        prev.filter(
                                                            (c) =>
                                                                c != item.name,
                                                        ),
                                                    );
                                          }}
                                          defaultChecked={true}
                                      />
                                  </label>
                              ) : (
                                  ""
                              ),
                          )}
                </div>
                <div className="mt-5 flex items-center justify-end">
                    <Button type={"submit"} disabled={isLoading}>
                        Export {isLoading && <LoadingSpinner />}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default ExportModal;
