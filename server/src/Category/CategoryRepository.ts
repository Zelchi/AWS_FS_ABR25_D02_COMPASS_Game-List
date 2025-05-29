import { PrismaClient } from '@prisma/client';
import { ICategoryEntity, ICategoryRegister } from './CategoryEntity';

const prisma = new PrismaClient();

class CategoryRepository {

    async create(categoryData: ICategoryRegister): Promise<void> {
        try {
            await prisma.category.create({
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

    async findByTitle(title: string): Promise<ICategoryEntity | null> {
        try {
            const category = await prisma.category.findFirst({
                where: { title, deletedAt: false }
            });
            return category;
        } catch (error) {
            throw new Error('Failed to find category by id');
        }
    };

    async findById(id: string): Promise<ICategoryEntity | null> {
        try {
            const category = await prisma.category.findUnique({
                where: { id, deletedAt: false }
            });
            return category;
        } catch (error) {
            throw new Error('Failed to find category by id');
        }
    }

    async findByUserId(userId: string): Promise<ICategoryEntity[]> {
        try {
            const category = await prisma.category.findMany({
                where: {
                    userId,
                    deletedAt: false
                }
            });
            console.log('Found categories:', category); 
            return category;
        } catch (error) {
            throw new Error('Failed to find category by id');
        }
    };
}

export const categoryRepository = new CategoryRepository();