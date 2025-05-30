import React, { useState } from "react";
import SiteLayout from "@/components/global/SiteLayout";
import Table from "@/components/global/Table";
import Filter from "@/components/global/Filter";

const initialGames = [
  {
    id: 1,
    image: "",
    title: "Mario Kart",
    description: "Mario B que ganhei de aniversário",
    category: "Racing",
    date: "08/12/2021 10:20",
    updatedAt: "",
    favorite: true,
  },
  {
    id: 2,
    image: "",
    title: "Valorant",
    description: "Valorant que jogo com amigos",
    category: "FPS",
    date: "08/12/2021 13:45",
    updatedAt: "08/12/2021 10:33",
    favorite: false,
  },
];

export default function Games() {
  const [games, setGames] = useState(initialGames);

  const handleGameUpdate = (updatedGame) => {
    setGames(games.map((game) => (game.id === updatedGame.id ? updatedGame : game)));
  };

  return (
    <SiteLayout>
      <Table games={games} onGameUpdate={handleGameUpdate} />
    </SiteLayout>
  );
}
