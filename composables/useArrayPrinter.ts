import { capitalize, arrayPdf } from "~/utils/helpers";

export const useArrayPrinter = (columns: string[], records: any[], filename: string): void => {
  const cols = columns.map((elt) => {
    return { header: capitalize(elt), dataKey: elt };
  });
  if (records.length > 0) arrayPdf(cols, records, filename);
  else ElMessage({ type: "warning", message: "Cette action est impossible car la liste est vide" });
};
