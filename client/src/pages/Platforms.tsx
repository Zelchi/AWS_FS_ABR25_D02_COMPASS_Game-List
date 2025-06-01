import SiteLayout from "@/components/global/SiteLayout";
import React, { useState, ChangeEvent, MouseEvent, useEffect } from "react";
import { getAllItems } from "@/utils/crudHandlers";
import { IPlatformEntity } from "@/../../server/src/Platform/PlatformEntity";
import Table from "@/components/global/Table";
import SearchBar from "@/components/global/SearchBar";
import ClearButton from "@/components/global/ClearButton";

const labels = {
  name: "Name",
  company: "Company",
};

export default function Platforms() {
  const [platforms, setPlatforms] = useState<IPlatformEntity[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("updatedAt");
  const [sortOrder, setSortOrder] = useState<string>("desc");

  const pathAPI =
    `platform/page?page=${page}&limit=${limit}` + `&sortBy=${sortBy}&sortOrder=${sortOrder}`;

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };

  const handleSortByAndOrder = (e: MouseEvent<HTMLButtonElement>): void => {
    if (e.currentTarget.value === sortBy) {
      setSortOrder((order) => (order === "asc" ? "desc" : "asc"));
      return;
    }
    setSortOrder("asc");
    setSortBy(e.currentTarget.value);
  };

  const handleClear = () => {
    setSearch("");
    fetchData(pathAPI);
  };

  const fetchData = async (path: string) => {
    const response = await getAllItems<{ platforms: IPlatformEntity[] }>(path);
    if (response && response.platforms) {
      setPlatforms(response.platforms);
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
        data={platforms}
        header={["name", "company"]}
        labels={labels}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortByAndOrder={handleSortByAndOrder}
        path={pathAPI}
        onItemsChange={setPlatforms}
        onClear={handleClear}
      />
      {/*Pagination*/}
    </SiteLayout>
  );
}
