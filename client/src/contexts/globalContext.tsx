import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  ChangeEvent,
  MouseEvent,
} from "react";
import { IGameEntity } from "@/../../server/src/Game/GameEntity";
import { ICategoryEntity } from "@/../../server/src/Category/CategoryEntity";
import { IPlatformEntity } from "@/../../server/src/Platform/PlatformEntity";
import { SortOrder } from "@/types/types";

type GlobalContextType = {
  games: IGameEntity[];
  setGames: React.Dispatch<React.SetStateAction<IGameEntity[]>>;
  categories: ICategoryEntity[];
  setCategories: React.Dispatch<React.SetStateAction<ICategoryEntity[]>>;
  platforms: IPlatformEntity[];
  setPlatforms: React.Dispatch<React.SetStateAction<IPlatformEntity[]>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  sortOrder: SortOrder;
  setSortOrder: React.Dispatch<React.SetStateAction<SortOrder>>;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSortBy: (e: MouseEvent<HTMLButtonElement> | ChangeEvent<HTMLSelectElement>) => void;
  handleSortOrder: (e: MouseEvent<HTMLButtonElement> | ChangeEvent<HTMLSelectElement>) => void;
  handleSortByAndOrder: (e: MouseEvent<HTMLButtonElement>) => void;
  handleClear: () => void;
  limit: number;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [games, setGames] = useState<IGameEntity[]>([]);
  const [categories, setCategories] = useState<ICategoryEntity[]>([]);
  const [platforms, setPlatforms] = useState<IPlatformEntity[]>([]);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("updatedAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const limit = 10;

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };

  const handleSortBy = (
    e: MouseEvent<HTMLButtonElement> | ChangeEvent<HTMLSelectElement>,
  ): void => {
    const value =
      e.type === "change"
        ? (e as ChangeEvent<HTMLSelectElement>).target.value
        : (e as MouseEvent<HTMLButtonElement>).currentTarget.value;

    if (value === sortBy) return;
    setSortBy(value);
  };

  const handleSortOrder = (
    e: MouseEvent<HTMLButtonElement> | ChangeEvent<HTMLSelectElement>,
  ): void => {
    setSortOrder((order: SortOrder) => (order === "asc" ? "desc" : "asc"));
  };

  const handleSortByAndOrder = (e: MouseEvent<HTMLButtonElement>): void => {
    if (e.currentTarget.value === sortBy) {
      setSortOrder((order: SortOrder) => (order === "asc" ? "desc" : "asc"));
      return;
    }
    setSortOrder("asc");
    setSortBy(e.currentTarget.value);
  };

  const handleClear = () => {
    setPage(1);
    setSearch("");
    setSortBy("updatedAt");
    setSortOrder("desc");
  };

  return (
    <GlobalContext.Provider
      value={{
        games,
        setGames,
        categories,
        setCategories,
        platforms,
        setPlatforms,
        page,
        setPage,
        search,
        setSearch,
        sortBy,
        setSortBy,
        sortOrder,
        setSortOrder,
        handleSearch,
        handleSortBy,
        handleSortOrder,
        handleSortByAndOrder,
        handleClear,
        limit,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal must be used inside a GlobalProvider");
  }
  return context;
};
