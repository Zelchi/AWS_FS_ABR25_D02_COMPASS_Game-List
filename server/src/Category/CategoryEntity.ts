export interface ICategoryEntity {
    id?: string;
    name: string;
    userId: string;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
    games?: { id: string }[];
}

export interface ICategoryRegister {
    name: string;
    userId: string;
    description: string;
};