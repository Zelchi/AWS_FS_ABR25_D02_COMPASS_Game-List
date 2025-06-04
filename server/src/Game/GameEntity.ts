export interface IGameEntity {
    id?: string;
    userId: string;
    name: string;
    description?: string | null;  
    imageUrl?: string | null;     
    price?: number | null;      
    status?: string | null;      
    favorite?: boolean | null; 
    rating?: number | null;     
    acquisDate?: Date | null;
    finishDate?: Date | null;
    releaseDate?: Date | null;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
    categories?: { id: string; }[];
    platforms?: { id: string; }[];
}

export interface IGameRegister {
    userId: string;
    name: string;
    description?: string | null; 
    imageUrl?: string | null;     
    price?: number | null;       
    status?: string | null;      
    favorite?: boolean | null;   
    rating?: number | null;       
    acquisDate?: Date | null;
    finishDate?: Date | null; 
    releaseDate?: Date | null;
    categories?: { id: string }[];
    platforms?: { id: string }[];
}