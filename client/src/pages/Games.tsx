const initialGames: IGameEntity[] = [
  {
    id: "1",
    userId: "1",
    imageUrl: "",
    name: "Mario Kart",
    description: "Mario B que ganhei de aniversário",
    categories: [{ id: "1" }],
    favorite: true,
    acquisDate: new Date(Date.now()),
    finishDate: null,
    status: "Playing",
    updatedAt: new Date(Date.now()),
  },
];

const labels = {
  name: "Title",
  description: "Description",
  imageUrl: "Image",
  status: "Status",
  favorite: "Favorite",
  rating: "Rating",
  acquisDate: "Acquisition Date",
  finishDate: "Finished Date",
  price: "Price",
  categories: "Categories",
  platforms: "Platforms",
  updatedAt: "Last Update",
};

import SiteLayout from "@/components/global/SiteLayout";
import React, { useState } from "react";
import { getAllItems, getItem } from "@/utils/crudHandlers";
import { IGameEntity } from "@/../../server/src/Game/GameEntity";
import FilterAndSearchBar from "@/components/global/FilterAndSearchBar";
import Table from "@/components/global/Table";

export default function Games() {
  const [page, setPage] = useState<number>(1);
  const [games, setGames] = useState<IGameEntity[]>(initialGames);
  const [filter, setFilter] = useState<string>("");
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("updatedAt");
  const [sortOrder, setSortOrder] = useState<string>("asc");

  const pathAPI = `/api/v1/game/page?page=${page}&limit={5}&sortBy=${sortBy}&sortOrder=${sortOrder}`;

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setFilter(e.target.value);
  };

  const handleFavorite = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setIsFavorite((is) => !is);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };

  const handleSortByAndOrder = (e: React.MouseEvent<HTMLButtonElement>): void => {
    if (e.currentTarget.value === sortBy) {
      setSortOrder((order) => (order === "asc" ? "desc" : "asc"));
      return;
    }
    setSortOrder("asc");
    setSortBy(e.currentTarget.value);
  };

  const handleClear = () => {
    setFilter("");
    setIsFavorite(false);
    setSearch("");
    setSortBy("updatedAt");
  };

  const handleRequest = async () => {
    if (!search.trim()) return;
    const data = await getAllItems<IGameEntity>(`${pathAPI}&search=${search}`);
    if (data) {
      setGames(data);
    }
  };

  return (
    <SiteLayout>
      <FilterAndSearchBar
        filter={filter}
        onFilter={handleFilter}
        isFavorite={isFavorite}
        onFavorite={handleFavorite}
        search={search}
        onSearch={handleSearch}
        onRequest={handleRequest}
        onClear={handleClear}
      />
      <Table<IGameEntity>
        data={games}
        header={["name", "rating", "price", "acquisDate", "finishDate", "updatedAt"]}
        labels={labels}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortByAndOrder={handleSortByAndOrder}
        path={pathAPI}
        onItemsChange={setGames}
        onClear={handleClear}
      />
      {/*Pagination*/}
    </SiteLayout>
  );
}
