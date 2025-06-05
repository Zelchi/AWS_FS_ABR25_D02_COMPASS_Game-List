import { useEffect } from "react";
import { IGameEntity } from "@/../../server/src/Game/GameEntity";
import FilterAndSearchBar from "@/components/data/filter/FilterAndSearchBar";
import SiteLayout from "@/components/layout/SiteLayout/SiteLayout";
import Table from "@/components/table/Table";
import { useGame } from "@/contexts/gameContext";
import { useGlobal } from "@/contexts/globalContext";

export default function GamesContent() {
  const { games, page, limit, sortBy, sortOrder, selectedFilter, isFavorite, isLaptop } =
    useGlobal();
  const { header, loadGames } = useGame();

  useEffect(() => {
    loadGames();
  }, [page, limit, sortBy, sortOrder, selectedFilter, isFavorite]);

  return (
    <SiteLayout>
      <FilterAndSearchBar onLoadItems={loadGames} header={header} />
      <Table<IGameEntity> data={games} header={isLaptop ? ["name"] : header} />
    </SiteLayout>
  );
}
