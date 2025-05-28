export interface IGameEntity {
    id?: string;
    name: string;
    genre: string;
    releaseDate: Date;
    description: string; 
    userId: string;
    imageUrl: string;    
    categories: { id: string; }[];
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: boolean;
}

export interface IGameRegister {
    name: string;
    genre: string;
    releaseDate: Date;
    userId: string;
    description: string;
    imageUrl: string;
    categories: { id: string }[];
}