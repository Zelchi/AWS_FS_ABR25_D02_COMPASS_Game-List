import { prisma } from '../db';
import { IPlatformEntity, IPlatformRegister } from './PlatformEntity';

class PlatformRepository {

    async findAllNames(userId: string): Promise<{ id: string, name: string }[]> {
        try {
            const platforms = await prisma.platform.findMany({
                where: {
                    userId,
                    deletedAt: null
                },
                select: {
                    id: true,
                    name: true
                },
                orderBy: {
                    name: 'asc'
                }
            });
            return platforms;
        } catch (error) {
            throw new Error('Failed to fetch platform names from database');
        }
    }

    async create(data: IPlatformRegister): Promise<IPlatformEntity> {
        try {
            return await prisma.platform.create({
                data,
                include: {
                    games: true
                }
            });
        } catch (error) {
            throw new Error('Failed to create platform in database');
        }
    }

    async update(id: string, data: Partial<IPlatformEntity>): Promise<IPlatformEntity> {
        try {
            const { id: platformId, userId, createdAt, updatedAt, deletedAt, games, ...updateData } = data;

            const platform = await prisma.platform.update({
                where: { id },
                data: updateData,
                include: {
                    games: true
                }
            });
            return platform;
        } catch (error) {
            throw new Error('Failed to update platform in database');
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await prisma.platform.update({
                where: { id },
                data: { deletedAt: new Date() }
            });
        } catch (error) {
            throw new Error('Failed to delete platform');
        }
    }

    async findById(id: string, userId: string): Promise<IPlatformEntity | null> {
        try {
            const platform = await prisma.platform.findFirst({
                where: {
                    id,
                    userId,
                    deletedAt: null
                },
                include: {
                    games: true
                }
            });
            return platform;
        } catch (error) {
            throw new Error('Failed to find platform by id');
        }
    }

    async findPaginated(
        page: number,
        limit: number,
        search: string,
        sortBy: string = 'createdAt',
        sortOrder: 'asc' | 'desc' = 'desc',
        userId: string
    ): Promise<{ platforms: IPlatformEntity[], total: number }> {
        try {
            const skip = (page - 1) * limit;

            const orderBy: any = {};
            orderBy[sortBy] = sortOrder;

            const where: any = {
                deletedAt: null,
                userId
            };

            if (search) {
                where.name = { contains: search };
            }

            const [platforms, total] = await Promise.all([
                prisma.platform.findMany({
                    where,
                    skip,
                    take: limit,
                    orderBy,
                    include: {
                        games: true
                    }
                }),
                prisma.platform.count({
                    where
                })
            ]);

            return { platforms, total };
        } catch (error) {
            throw new Error('Failed to fetch paginated platforms');
        }
    }

    async findByName(searchTerm: string, userId: string): Promise<IPlatformEntity[]> {
        try {
            const platforms = await prisma.platform.findMany({
                where: {
                    name: { contains: searchTerm },
                    userId,
                    deletedAt: null
                },
                include: {
                    games: true
                }
            });
            return platforms;
        } catch (error) {
            throw new Error('Failed to find platforms by name');
        }
    }
}

export const platformRepository = new PlatformRepository();