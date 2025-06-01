import SiteLayout from "@/components/global/SiteLayout";
import React, { useState, ChangeEvent, MouseEvent, useEffect } from "react";
import { getAllItems } from "@/utils/crudHandlers";
import { IPlatformEntity } from "@/../../server/src/Category/CategoryEntity";
import Table from "@/components/global/Table";
import SearchBar from "@/components/global/SearchBar";
import ClearButton from "@/components/global/ClearButton";

const labels = {
  name: "Name",
};

export default function Categories() {
  const [categories, setCategories] = useState<IPlatformEntity[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("desc");

  const pathAPI =
    `category/page?page=${page}&limit=${limit}` + `&sortBy=name&sortOrder=${sortOrder}`;

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };

  const handleSortOrder = (e: MouseEvent<HTMLButtonElement>): void => {
    setSortOrder((order) => (order === "asc" ? "desc" : "asc"));
  };

  const handleClear = () => {
    setSearch("");
    fetchData(pathAPI);
  };

  const fetchData = async (path: string) => {
    const response = await getAllItems<{ categories: IPlatformEntity[] }>(path);
    if (response && response.categories) {
      setCategories(response.categories);
    }
  };

  const handleRequest = async (): Promise<void> => {
    const searchInput = search.trim();
    if (!searchInput) return fetchData(pathAPI);
    if (searchInput) return fetchData(`${pathAPI}&search=${search}`);
  };

  useEffect(() => {
    handleRequest();
  }, [page, limit, sortOrder]);

  return (
    <SiteLayout>
      <SearchBar search={search} onSearch={handleSearch} onRequest={handleRequest} />
      <ClearButton onClick={handleClear} />
      <Table<IPlatformEntity>
        data={categories}
        header={["name"]}
        labels={labels}
        sortOrder={sortOrder}
        onSortByAndOrder={handleSortOrder}
        path={pathAPI}
        onItemsChange={setCategories}
        onClear={handleClear}
      />
      {/*Pagination*/}
    </SiteLayout>
  );
}
