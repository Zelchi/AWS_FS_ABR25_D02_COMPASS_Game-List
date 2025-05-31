import { prisma } from '../db';
import { ICategoryEntity, ICategoryRegister } from './CategoryEntity';

class CategoryRepository {

    async findAllNames(userId: string): Promise<string[]> {
        try {
            const categories = await prisma.category.findMany({
                where: {
                    userId,
                    deletedAt: null
                },
                select: {
                    name: true
                },
                orderBy: {
                    name: 'asc'
                }
            });
            return categories.map(category => category.name);
        } catch (error) {
            throw new Error('Failed to fetch category names');
        }
    }

    async create(categoryData: ICategoryRegister): Promise<ICategoryEntity> {
        try {
            return await prisma.category.create({
                data: categoryData,
                include: {
                    games: true
                }
            });
        } catch (error) {
            throw new Error('Failed to create category in database');
        }
    };

    async update(id: string, data: Partial<ICategoryRegister>): Promise<ICategoryEntity> {
        try {
            const category = await prisma.category.update({
                where: { id },
                data,
                include: {
                    games: true
                }
            });
            return category;
        } catch (error) {
            throw new Error('Failed to update category in database');
        }
    };

    async delete(id: string): Promise<void> {
        try {
            await prisma.category.update({
                where: { id },
                data: { deletedAt: new Date() }
            });
        } catch (error) {
            throw new Error('Failed to delete category');
        }
    };

    async findById(id: string, userId: string): Promise<ICategoryEntity | null> {
        try {
            const category = await prisma.category.findFirst({
                where: { 
                    id, 
                    userId, 
                    deletedAt: null 
                },
                include: {
                    games: true
                }
            });
            return category;
        } catch (error) {
            throw new Error('Failed to find category by id');
        }
    }

    async findPaginated(
        page: number,
        limit: number,
        sortBy: string = 'createdAt',
        sortOrder: 'asc' | 'desc' = 'desc',
        userId: string
    ): Promise<{ categories: ICategoryEntity[], total: number }> {
        try {
            const skip = (page - 1) * limit;

            const orderBy: any = {};
            orderBy[sortBy] = sortOrder;

            const where = { deletedAt: null, userId };

            const [categories, total] = await Promise.all([
                prisma.category.findMany({
                    where,
                    skip,
                    take: limit,
                    orderBy,
                    include: {
                        games: true
                    }
                }),
                prisma.category.count({
                    where
                })
            ]);

            return { categories, total };
        } catch (error) {
            throw new Error('Failed to fetch paginated categories');
        }
    }

    async findByName(searchTerm: string, userId: string): Promise<ICategoryEntity[]> {
        try {
            const categories = await prisma.category.findMany({
                where: {
                    name: { contains: searchTerm },
                    userId,
                    deletedAt: null
                },
                include: {
                    games: true
                }
            });
            return categories;
        } catch (error) {
            throw new Error('Failed to find categories by name');
        }
    }
}

export const categoryRepository = new CategoryRepository();