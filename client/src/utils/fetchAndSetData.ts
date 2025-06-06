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

type PaginationResponse = {
  total?: number;
  currentPage?: number;
  totalPages?: number;
  [key: string]: any;
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

  const response = await getAllItems<PaginationResponse | PaginationResponse[]>(finalPath);
  const data = extractData(response);

  console.log("Response from fetchAndSetData:", response);

  if (data) {
    setData(data);
    if (Array.isArray(response)) {
      setPagination({
        total: response.length,
        currentPage: 1,
        totalPages: 1,
      });
    } else {
      setPagination({
        total: (response && (response as PaginationResponse)?.total) || 0,
        currentPage: (response && (response as PaginationResponse)?.currentPage) || 1,
        totalPages: (response && (response as PaginationResponse)?.totalPages) || 1,
      });
    }
  }
};
