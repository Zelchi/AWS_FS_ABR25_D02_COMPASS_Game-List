export interface IDashboardEntity {
    id?: string;
    userId: string;
    totalPrice: number;
    topPlatform?: string | null;
    topCategory?: string | null;
    avgRating: number;
    totalFavorites: number;
    totalAbandoned: number;
    totalDone: number;
    totalPlaying: number;
    totalGames: number;    
    totalCategories: number; 
    totalPlatforms: number;
    lastUpdated?: Date;
}