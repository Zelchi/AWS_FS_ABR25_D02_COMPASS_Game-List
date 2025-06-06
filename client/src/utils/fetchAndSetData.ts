import { getAllItems } from "@/utils/crudHandlers";

type FetchAndSetType<T> = {
  path: string;
  search?: string;
  setData: (data: T) => void;
  extractData: (response: any) => T | undefined;
  setPagination: (pagination: {
    total: number;
    currentPage: number;
    totalPages: number;
  }) => void;
};

export const fetchAndSetData = async <T>({
  search,
  path,
  setData,
  setPagination,
  extractData,
}: FetchAndSetType<T>): Promise<void> => {
  const trimmedSearch = search?.trim();
  const finalPath = trimmedSearch ? `${path}&search=${trimmedSearch}` : path;

  const response = await getAllItems<any>(finalPath);
  const data = extractData(response);

  if (data) {
    setData(data);
    setPagination({
      total: response?.total || 0,
      currentPage: response?.currentPage || 1,
      totalPages: response?.totalPages || 1,
    })
  }
};
