import { prisma } from '../db';
import { IGameEntity, IGameRegister } from './GameEntity';

class GameRepository {

    async create(data: IGameRegister) {
        const { categories, platforms, ...gameData } = data;

        const userExists = await prisma.user.findUnique({
            where: { id: gameData.userId },
            select: { id: true }
        });

        if (!userExists) {
            throw new Error(`User with ID ${gameData.userId} does not exist`);
        }

        if (categories && categories.length > 0) {
            const categoryIds = categories.map(cat => cat.id);
            const existingCategories = await prisma.category.findMany({
                where: {
                    id: { in: categoryIds }
                },
                select: { id: true }
            });

            if (existingCategories.length !== categoryIds.length) {
                const existingIds = existingCategories.map(cat => cat.id);
                const missingIds = categoryIds.filter(id => !existingIds.includes(id));
                throw new Error(`Categories with IDs ${missingIds.join(', ')} do not exist`);
            }
        }

        if (platforms && platforms.length > 0) {
            const platformIds = platforms.map(plat => plat.id);
            const existingPlatforms = await prisma.platform.findMany({
                where: {
                    id: { in: platformIds }
                },
                select: { id: true }
            });

            if (existingPlatforms.length !== platformIds.length) {
                const existingIds = existingPlatforms.map(plat => plat.id);
                const missingIds = platformIds.filter(id => !existingIds.includes(id));
                throw new Error(`Platforms with IDs ${missingIds.join(', ')} do not exist`);
            }
        }

        return prisma.game.create({
            data: {
                ...gameData,
                categories: {
                    connect: categories?.map(cat => ({ id: cat.id })) || []
                },
                platforms: {
                    connect: platforms?.map(plat => ({ id: plat.id })) || []
                }
            },
            include: {
                categories: true,
                platforms: true
            }
        });
    }

    async update(id: string, data: Partial<IGameEntity>) {
        const { categories, platforms, ...gameData } = data;

        return prisma.game.update({
            where: { id },
            data: {
                ...gameData,
                ...(categories && {
                    categories: {
                        set: categories.map(cat => ({ id: cat.id }))
                    }
                }),
                ...(platforms && {
                    platforms: {
                        set: platforms.map(plat => ({ id: plat.id }))
                    }
                })
            },
            include: {
                categories: true,
                platforms: true
            }
        });
    }

    async delete(id: string) {
        return prisma.game.update({
            where: { id },
            data: { deletedAt: new Date() }
        });
    }

    async findById(id: string): Promise<IGameEntity | null> {
        return prisma.game.findUnique({
            where: { 
                id,
                deletedAt: null
            },
            include: {
                categories: true,
                platforms: true
            }
        });
    }

    async findPaginated(
        page: number,
        limit: number,
        sortBy: string = 'createdAt',
        sortOrder: 'asc' | 'desc' = 'desc',
        userId: string
    ): Promise<{ games: IGameEntity[], total: number }> {
        const skip = (page - 1) * limit;

        const orderBy: any = {};
        orderBy[sortBy] = sortOrder;

        const where = { deletedAt: null, userId };

        const [games, total] = await Promise.all([
            prisma.game.findMany({
                where,
                include: {
                    categories: true,
                    platforms: true
                },
                skip,
                take: limit,
                orderBy
            }),
            prisma.game.count({
                where
            })
        ]);

        return { games, total };
    }
    
    async findByName(name: string, userId: string): Promise<IGameEntity[]> {
        try {
            const games = await prisma.game.findMany({
                where: {
                    name: { contains: name },
                    userId,
                    deletedAt: null
                },
                include: {
                    categories: true,
                    platforms: true
                }
            });
            return games;
        } catch (error) {
            throw new Error('Failed to find games by name');
        }
    }
}

export const gameRepository = new GameRepository();