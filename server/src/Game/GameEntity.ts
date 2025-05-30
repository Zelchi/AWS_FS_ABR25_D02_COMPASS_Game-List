export interface IGameEntity {
    id?: string;
    userId: string;
    name: string;
    description: string;
    imageUrl: string;
    status?: string;
    favorite?: boolean;
    acquisDate: Date;
    finishDate?: Date | null;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
    categories: { id: string; }[];
    platforms?: { id: string; }[];
}

export interface IGameRegister {
    userId: string;
    name: string;
    description: string;
    imageUrl: string;
    status?: string;
    favorite?: boolean;
    acquisDate: Date;
    finishDate?: Date | null; 
    categories: { id: string }[];
    platforms: { id: string }[];
}