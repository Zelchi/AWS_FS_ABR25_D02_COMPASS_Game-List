import { ICategoryEntity, ICategoryRegister } from './CategoryEntity';
import { categoryRepository } from './CategoryRepository';

class CategoryService {

    async create(categoryData: ICategoryRegister): Promise<void> {
        try {
            await categoryRepository.create(categoryData);
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Failed to create category');
        }
    }

    async update(id: string, data: Partial<ICategoryRegister>): Promise<ICategoryEntity> {
        try {
            const existingCategory = await categoryRepository.findById(id);
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

    async delete(id: string): Promise<boolean> {
        try {
            const category = await categoryRepository.findById(id);
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

    async getCategoryById(id: string): Promise<ICategoryEntity | null> {
        try {
            return await categoryRepository.findById(id);
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Failed to get category');
        }
    }

    async getCategoriesByUserId(userId: string): Promise<ICategoryEntity[]> {
        try {
            console.log(userId);
            return await categoryRepository.findByUserId(userId);
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Failed to get categories by user ID');
        }
    }
}

export const categoryService = new CategoryService();