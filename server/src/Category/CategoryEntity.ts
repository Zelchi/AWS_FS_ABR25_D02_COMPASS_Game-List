export interface ICategoryEntity {
    id?: string;
    title: string;
    userId: string;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: boolean;
    games?: { id: string }[];
}

export interface ICategoryRegister {
    title: string;
    userId: string;
    description: string;
};