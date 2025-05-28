import { prisma } from '../db';
import { IGameEntity, IGameRegister } from './GameEntity';

class GameRepository {

    async findByGenre(genre: string): Promise<IGameEntity[]> {
        return prisma.game.findMany({
            where: { genre, deletedAt: false },
            include: {
                categories: true
            }
        });
    }

    async findByName(name: string): Promise<IGameEntity[]> {
        return prisma.game.findMany({
            where: {
                name: { contains: name },
                deletedAt: false
            },
            include: {
                categories: true
            }
        });
    }

    async findById(id: string): Promise<IGameEntity | null> {
        return prisma.game.findUnique({
            where: { id, deletedAt: false },
            include: {
                categories: true
            }
        });
    }

    async findAll(): Promise<IGameEntity[]> {
        return await prisma.game.findMany({
            where: { deletedAt: false },
            include: {
                categories: true
            }
        });
    }

    async update(id: string, data: Partial<IGameEntity>) {
        const { categories, ...gameData } = data;

        return prisma.game.update({
            where: { id },
            data: {
                ...gameData,
                ...(categories && {
                    categories: {
                        set: categories.map(cat => ({ id: cat.id }))
                    }
                })
            },
            include: {
                categories: true
            }
        });
    }

    async findByReleaseDate(releaseDate: Date) {
        return prisma.game.findMany({
            where: {
                releaseDate,
                deletedAt: false
            },
            include: {
                categories: true
            }
        });
    }

    async create(data: IGameRegister) {
        const { categories, ...gameData } = data;

        return prisma.game.create({
            data: {
                ...gameData,
                ...(categories && {
                    categories: {
                        connect: categories.map(cat => ({ id: cat.id }))
                    }
                })
            },
            include: {
                categories: true
            }
        });
    }

    async delete(id: string) {
        return prisma.game.update({
            where: { id },
            data: { deletedAt: true }
        });
    }
}

export const gameRepository = new GameRepository();