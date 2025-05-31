// import React, { useState } from "react";
// import SiteLayout from "@/components/global/SiteLayout";
// import Table from "@/components/global/Table";
// import Filter from "@/components/global/Filter";
//
// const initialGames = [
//   {
//     id: 1,
//     image: "",
//     title: "Mario Kart",
//     description: "Mario B que ganhei de aniversário",
//     category: "Racing",
//     date: "08/12/2021 10:20",
//     updatedAt: "",
//     favorite: true,
//   },
//   {
//     id: 2,
//     image: "",
//     title: "Valorant",
//     description: "Valorant que jogo com amigos",
//     category: "FPS",
//     date: "08/12/2021 13:45",
//     updatedAt: "08/12/2021 10:33",
//     favorite: false,
//   },
// ];
//
// export default function Games() {
//   const [games, setGames] = useState(initialGames);
//
//   const handleGameUpdate = (updatedGame) => {
//     setGames(games.map((game) => (game.id === updatedGame.id ? updatedGame : game)));
//   };
//
//   return (
//     <SiteLayout>
//       <Table games={games} onGameUpdate={handleGameUpdate} />
//     </SiteLayout>
//   );
// }

import SiteLayout from "@/components/global/SiteLayout";
import React, { useState } from "react";
import FilterAndSearchBar from "@/components/global/FilterAndSearchBar";
import Table from "@/components/global/Table";

export default function Games() {
  const [filter, setFilter] = useState<string>("");
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("Newest");

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setFilter(e.target.value);
  };

  const handleFavorite = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setIsFavorite((is) => !is);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };

  const handleRequest = () => {
    console.log(`Request ${search}`);
  };

  const handleClear = () => {
    setFilter("");
    setIsFavorite(false);
    setSearch("");
    setSort("Newest");
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
      {/*Table*/}
      {/*Pagination*/}
    </SiteLayout>
  );
}
