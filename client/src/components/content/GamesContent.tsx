import SiteLayout from "@/components/global/SiteLayout";
import { use, useEffect } from "react";
import { IGameEntity } from "@/../../server/src/Game/GameEntity";
import Table from "@/components/global/Table";
import FilterAndSearchBar from "@/components/global/FilterAndSearchBar";
import { useGlobal } from "@/contexts/globalContext";
import { useGame } from "@/contexts/gameContext";
import { useModal } from "@/contexts/modalContext";
import GameForm from "@/components/forms/GameForm";

export default function GamesContent() {
  const { games, page, limit, sortBy, sortOrder, selectedFilter, isFavorite, isLaptop } = useGlobal();
  const { header, loadGames } = useGame();
  const { setIsModalOpen, setModalContent } = useModal();

  useEffect(() => {
    loadGames();
  }, [page, limit, sortBy, sortOrder, selectedFilter, isFavorite]);

  useEffect(() => {
    setModalContent(GameForm({games[0]}));
  }, []);

  return (
    <SiteLayout>
      <button
        style={{ width: "100px", height: "50px" }}
        onClick={() => setIsModalOpen(true)}
      >
        Open Modal
      </button>
      
      <FilterAndSearchBar onLoadItems={loadGames} header={header} />
      <Table<IGameEntity> data={games} header={isLaptop ? ["name"] : header} />
    </SiteLayout>
  );
}
