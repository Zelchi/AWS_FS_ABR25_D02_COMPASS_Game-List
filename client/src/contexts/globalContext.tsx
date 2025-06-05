import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  ChangeEvent,
  MouseEvent,
  useCallback,
} from "react";
import { useMediaQuery } from "react-responsive";
import { useLocation } from "react-router-dom";
import { ICategoryEntity } from "@/../../server/src/Category/CategoryEntity";
import { IGameEntity } from "@/../../server/src/Game/GameEntity";
import { IPlatformEntity } from "@/../../server/src/Platform/PlatformEntity";
import { SortOrder } from "@/types/types";
import { breakpoints } from "@/utils/breakpoints";
import API from "@/utils/API";
import { fetchAndSetData } from "@/utils/fetchAndSetData";

type GlobalContextType = {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
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
  filters: string;
  setFilters: React.Dispatch<React.SetStateAction<string>>;
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
  isFavorite: boolean;
  setIsFavorite: React.Dispatch<React.SetStateAction<boolean>>;
  setSortOrder: React.Dispatch<React.SetStateAction<SortOrder>>;
  loadGames: () => Promise<void>;
  loadCategories: () => Promise<void>;
  loadPlatforms: () => Promise<void>;
  handleUserName: () => Promise<void>;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSortBy: (e: MouseEvent<HTMLButtonElement> | ChangeEvent<HTMLSelectElement>) => void;
  handleSortOrder: (e: MouseEvent<HTMLButtonElement> | ChangeEvent<HTMLSelectElement>) => void;
  handleSortByAndOrder: (e: MouseEvent<HTMLButtonElement>) => void;
  handleFilters: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleSelectedFilter: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleIsFavorite: () => void;
  handleLoad: () => void;
  handleClear: () => void;
  isMobile: boolean;
  isTablet: boolean;
  isLaptop: boolean;
  isDesktop: boolean;
  limit: number;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string>("");
  const [games, setGames] = useState<IGameEntity[]>([]);
  const [categories, setCategories] = useState<ICategoryEntity[]>([]);
  const [platforms, setPlatforms] = useState<IPlatformEntity[]>([]);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("updatedAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [filters, setFilters] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const { mobile, tablet, laptop, desktop } = breakpoints;
  const path = useLocation().pathname;

  const isMobile = useMediaQuery({ maxWidth: mobile * 16 });
  const isTablet = useMediaQuery({ maxWidth: tablet * 16 });
  const isLaptop = useMediaQuery({ maxWidth: laptop * 16 });
  const isDesktop = useMediaQuery({ maxWidth: desktop * 16 });
  const limit = 10;

  const gamesPathAPI =
    `game/page?page=${page}&limit=${limit}` +
    `&sortBy=${sortBy}&sortOrder=${sortOrder}` +
    `${selectedFilter ? `&${filters}=${selectedFilter}` : ""}` +
    `${isFavorite ? `&isFavorite=${isFavorite}` : ""}`;

  const categoriesPathAPI =
    `category/page?page=${page}&limit=${limit}` + `&sortBy=name&sortOrder=${sortOrder}`;

  const platformsPathAPI =
    `platform/page?page=${page}&limit=${limit}` + `&sortBy=${sortBy}&sortOrder=${sortOrder}`;

  const loadGames = async () => {
    await fetchAndSetData<IGameEntity[]>({
      path: gamesPathAPI,
      search,
      setData: setGames,
      extractData: (res) => res?.games,
    });
  };

  const loadCategories = async () => {
    await fetchAndSetData<ICategoryEntity[]>({
      path: categoriesPathAPI,
      search,
      setData: setCategories,
      extractData: (res) => res?.categories,
    });
  };

  const loadPlatforms = async () => {
    await fetchAndSetData<IPlatformEntity[]>({
      path: platformsPathAPI,
      search,
      setData: setPlatforms,
      extractData: (res) => res?.platforms,
    });
  };

  const handleUserName = useCallback(async () => {
    const res = await API.GET("account/");
    if (res.status === 200) {
      setUser(res.data.name);
    }
  }, []);

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
    setSortBy(e.currentTarget.value);
  };

  const handleFilters = (e: ChangeEvent<HTMLSelectElement>): void => {
    setFilters(e.target.value);
  };

  const handleSelectedFilter = (e: ChangeEvent<HTMLSelectElement>): void => {
    setSelectedFilter(e.target.value);
  };

  const handleIsFavorite = (): void => {
    setIsFavorite((is) => !is);
  };

  const handleLoad = (): void => {
    if (path === "/Games") void loadGames();
    if (path === "/Categories") void loadCategories();
    if (path === "/Platforms") void loadPlatforms();
  };

  const handleClear = (): void => {
    setPage(1);
    setSearch("");
    setSortBy(isLaptop ? "" : "updatedAt");
    setSortOrder("desc");
    setFilters("");
    setSelectedFilter("");
    setIsFavorite(false);
    handleLoad();
  };

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
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
        filters,
        setFilters,
        selectedFilter,
        setSelectedFilter,
        isFavorite,
        setIsFavorite,
        loadGames,
        loadCategories,
        loadPlatforms,
        handleUserName,
        handleSearch,
        handleSortBy,
        handleSortOrder,
        handleSortByAndOrder,
        handleLoad,
        handleClear,
        handleFilters,
        handleSelectedFilter,
        handleIsFavorite,
        isMobile,
        isTablet,
        isLaptop,
        isDesktop,
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
