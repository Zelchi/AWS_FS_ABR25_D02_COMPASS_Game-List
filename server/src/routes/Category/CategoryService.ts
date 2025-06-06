import { ICategoryEntity, ICategoryRegister } from './CategoryEntity';
import { categoryRepository } from './CategoryRepository';

class CategoryService {

    async getAllCategories(userId: string): Promise<{ id: string, name: string }[]> {
        try {
            return await categoryRepository.findAllNames(userId);
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Failed to get all categories');
        }
    }

    async create(categoryData: ICategoryRegister): Promise<ICategoryEntity> {
        try {
            return await categoryRepository.create(categoryData);
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Failed to create category');
        }
    }

    async update(id: string, userId: string, data: Partial<ICategoryRegister>): Promise<ICategoryEntity> {
        try {
            const existingCategory = await categoryRepository.findById(id, userId);
            if (!existingCategory) {
                throw new Error('Category not found');
            }

            const updatedCategory = await categoryRepository.update(id, data);
            return updatedCategory;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Failed to update category');
        }
    }

    async delete(id: string, userId: string): Promise<boolean> {
        try {
            const category = await categoryRepository.findById(id, userId);
            if (!category) {
                return false;
            }

            await categoryRepository.delete(id);
            return true;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Failed to delete category');
        }
    }

    async getCategoryById(id: string, userId: string): Promise<ICategoryEntity | null> {
        try {
            return await categoryRepository.findById(id, userId);
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Failed to get category');
        }
    }

    async getPaginated(
        page: number,
        limit: number,
        search: string,
        sortBy: string = 'createdAt',
        sortOrder: 'asc' | 'desc' = 'desc',
        userId: string
    ): Promise<{
        categories: ICategoryEntity[],
        total: number,
        currentPage: number,
        totalPages: number,
    }> {
        try {
            const { categories, total } = await categoryRepository.findPaginated(page, limit, search, sortBy, sortOrder, userId);
            const totalPages = Math.ceil(total / limit);

            return {
                categories,
                total,
                currentPage: page,
                totalPages
            };
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Failed to get paginated categories');
        }
    }

    async getCategoriesByName(name: string, userId: string): Promise<ICategoryEntity[]> {
        try {
            return await categoryRepository.findByName(name, userId);
        } catch (error) {
            throw new Error('Failed to get categories by name');
        }
    }
}

export const categoryService = new CategoryService();