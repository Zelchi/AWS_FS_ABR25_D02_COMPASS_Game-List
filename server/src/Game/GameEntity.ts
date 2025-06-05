export interface IGameEntity {
    id?: string;
    userId: string;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    status: string;
    favorite: boolean;
    rating: number;
    acquisDate: Date | null;
    finishDate: Date | null;
    releaseDate: Date | null; 
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    categories?: { id: string; }[];
    platforms?: { id: string; }[];
}

export interface IGameRegister {
    userId: string;
    name: string;
    description?: string;
    imageUrl?: string;
    price?: number;
    status?: string;
    favorite?: boolean;
    rating?: number;
    acquisDate?: Date;
    finishDate?: Date;
    releaseDate?: Date; 
    categories?: { id: string }[];
    platforms?: { id: string }[];
}