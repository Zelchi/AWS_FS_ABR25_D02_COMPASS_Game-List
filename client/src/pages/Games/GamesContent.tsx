import SiteLayout from "@/components/global/SiteLayout";
import { useEffect } from "react";
import { IGameEntity } from "@/../../server/src/Game/GameEntity";
import Table from "@/components/global/Table";
import FilterAndSearchBar from "@/components/global/FilterAndSearchBar";
import { useGlobal } from "@/contexts/globalContext";
import { useGame } from "@/contexts/gameContext";
import { useModal } from "@/contexts/modalContext";

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
