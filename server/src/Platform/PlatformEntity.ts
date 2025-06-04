export interface IPlatformEntity {
    id?: string;
    userId: string;
    name: string;
    company: string;
    imageUrl: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
    games?: { id: string }[];
}

export interface IPlatformRegister {
    userId: string;
    name: string;
    company: string;
    imageUrl: string;
}