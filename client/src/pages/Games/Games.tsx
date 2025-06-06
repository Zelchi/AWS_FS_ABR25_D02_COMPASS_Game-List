import { useEffect } from "react";
import { IGameEntity } from "@/../../server/src/routes/Game/GameEntity";
import FilterAndSearchBar from "@/components/data/filter/FilterAndSearchBar";
import SiteLayout from "@/components/layout/SiteLayout/SiteLayout";
import Table from "@/components/table/Table";
import { useGlobal } from "@/contexts/globalContext";
import styled from "styled-components";
import { PaginationButtons } from "@/components/table/TablePagination";

export default function Games() {
  const {
    games,
    page,
    limit,
    sortBy,
    sortOrder,
    selectedFilter,
    isFavorite,
    isLaptop,
    loadGames,
    cleared,
  } = useGlobal();
  const header = ["name", "rating", "price", "acquisDate", "finishDate"];

  useEffect(() => {
    void loadGames();
  }, [page, limit, sortBy, sortOrder, selectedFilter, isFavorite, cleared]);

  return (
    <SiteLayout>
      <FilterAndSearchBar header={header} />
      <Table<IGameEntity> data={games} header={isLaptop ? ["name"] : header} />
      <PaginationButtons />
    </SiteLayout>
  );
}
