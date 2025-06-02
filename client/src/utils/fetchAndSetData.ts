import { getAllItems } from "@/utils/crudHandlers";

type FetchAndSetType<T> = {
  path: string;
  search?: string;
  setData: (data: T) => void;
  extractData: (response: any) => T | undefined;
};

export const fetchAndSetData = async <T>({
  search,
  path,
  setData,
  extractData,
}: FetchAndSetType<T>): Promise<void> => {
  try {
    const trimmedSearch = search?.trim();
    const finalPath = trimmedSearch ? `${path}&search=${trimmedSearch}` : path;

    const response = await getAllItems<any>(finalPath);
    const data = extractData(response);

    if (data) {
      setData(data);
    }
  } catch (error) {
    console.error("Error searching data:", error);
  }
};
