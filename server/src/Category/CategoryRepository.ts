import { PrismaClient } from '@prisma/client';
import { ICategoryEntity, ICategoryRegister } from './CategoryEntity';

const prisma = new PrismaClient();

class CategoryRepository {

    async create(categoryData: ICategoryRegister): Promise<ICategoryEntity> {
        try {
            return await prisma.category.create({
                data: categoryData
            });
        } catch (error) {
            throw new Error('Failed to create category in database');
        }
    };

    async update(id: string, data: Partial<ICategoryRegister>): Promise<ICategoryEntity> {
        try {
            const category = await prisma.category.update({
                where: { id },
                data
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
                data: { deletedAt: true }
            });
        } catch (error) {
            throw new Error('Failed to delete category');
        }
    };

    async findById(id: string, userId: string): Promise<ICategoryEntity | null> {
        try {
            const category = await prisma.category.findFirst({
                where: { id, userId, deletedAt: false }
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

            const where = { deletedAt: false, userId };

            const [categories, total] = await Promise.all([
                prisma.category.findMany({
                    where,
                    skip,
                    take: limit,
                    orderBy
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
                    title: { contains: searchTerm },
                    userId,
                    deletedAt: false
                }
            });
            return categories;
        } catch (error) {
            throw new Error('Failed to find categories by name');
        }
    }
}

export const categoryRepository = new CategoryRepository();