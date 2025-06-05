import { useEffect } from "react";
import { IGameEntity } from "@/../../server/src/Game/GameEntity";
import FilterAndSearchBar from "@/components/data/filter/FilterAndSearchBar";
import SiteLayout from "@/components/layout/SiteLayout/SiteLayout";
import Table from "@/components/table/Table";
import { useGlobal } from "@/contexts/globalContext";

export default function GamesContent() {
  const { games, page, limit, sortBy, sortOrder, selectedFilter, isFavorite, isLaptop, loadGames } =
    useGlobal();
  const header = ["name", "rating", "price", "acquisDate", "finishDate"];

  useEffect(() => {
    void loadGames();
  }, [page, limit, sortBy, sortOrder, selectedFilter, isFavorite]);

  return (
    <SiteLayout>
      <FilterAndSearchBar header={header} />
      <Table<IGameEntity> data={games} header={isLaptop ? ["name"] : header} />
    </SiteLayout>
  );
}
