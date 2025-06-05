export type EntityWithId = { id: string };

export type IStatistics = {
  id: string;
  userId: string;
  totalPrice: number;
  topPlatform: string;
  topCategory: string;
  avgRating: number;
  totalFavorites: number;
  totalAbandoned: number;
  totalDone: number;
  totalPlaying: number;
  totalGames: number;
  totalCategories: number;
  totalPlatforms: number;
  lastUpdated: Date;
};

export type TStatistics = IStatistics | undefined;

export type SortOrder = "asc" | "desc";
