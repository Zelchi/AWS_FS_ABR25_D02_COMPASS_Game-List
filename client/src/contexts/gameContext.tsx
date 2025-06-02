import React, { createContext, ReactNode, useContext } from "react";
import { IGameEntity } from "@/../../server/src/Game/GameEntity";
import { useGlobal } from "@/contexts/globalContext";
import { fetchAndSetData } from "@/utils/fetchAndSetData";

type GameContextType = {
  header: string[];
  loadGames: () => Promise<void>;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const { setGames, page, sortBy, sortOrder, search, filters, selectedFilter, isFavorite, limit } =
    useGlobal();

  const header = ["name", "rating", "price", "acquisDate", "finishDate"];
  const pathAPI =
    `game/page?page=${page}&limit=${limit}` +
    `&sortBy=${sortBy}&sortOrder=${sortOrder}` +
    `${selectedFilter ? `&${filters}=${selectedFilter}` : ""}` +
    `${isFavorite ? `&isFavorite=${isFavorite}` : ""}`;

  const loadGames = async () => {
    await fetchAndSetData<IGameEntity[]>({
      path: pathAPI,
      search,
      setData: setGames,
      extractData: (res) => res?.games,
    });
  };

  return (
    <GameContext.Provider
      value={{
        header,
        loadGames,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used inside a GameProvider");
  }
  return context;
};
