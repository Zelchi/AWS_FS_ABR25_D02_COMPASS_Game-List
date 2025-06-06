import { IPlatformEntity, IPlatformRegister } from './PlatformEntity';
import { platformRepository } from './PlatformRepository';

class PlatformService {

    async getAllPlatforms(userId: string): Promise<{ id: string, name: string }[]> {
        try {
            const platforms = await platformRepository.findAllNames(userId);
            if (!platforms || platforms.length === 0) {
                throw new Error('No platforms found');
            }
            return platforms;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Failed to get all platforms');
        }
    }

    async create(platformData: IPlatformRegister): Promise<IPlatformEntity> {
        try {
            return await platformRepository.create(platformData);
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Failed to create platform');
        }
    }

    async update(id: string, userId: string, data: Partial<IPlatformEntity>): Promise<IPlatformEntity> {
        try {
            const existingPlatform = await platformRepository.findById(id, userId);
            if (!existingPlatform) {
                throw new Error('Platform not found');
            }

            const updatedPlatform = await platformRepository.update(id, data);
            return updatedPlatform;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Failed to update platform');
        }
    }

    async delete(id: string, userId: string): Promise<boolean> {
        try {
            const platform = await platformRepository.findById(id, userId);
            if (!platform) {
                return false;
            }

            await platformRepository.delete(id);
            return true;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Failed to delete platform');
        }
    }

    async getPlatformById(id: string, userId: string): Promise<IPlatformEntity | null> {
        try {
            const platform = await platformRepository.findById(id, userId);
            if (!platform) {
                throw new Error('Platform not found');
            }
            return platform;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Failed to get platform');
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
        platforms: IPlatformEntity[],
        total: number,
        currentPage: number,
        totalPages: number,
    }> {
        try {
            const { platforms, total } = await platformRepository.findPaginated(page, limit, search, sortBy, sortOrder, userId);
            const totalPages = Math.ceil(total / limit);

            return {
                platforms,
                total,
                currentPage: page,
                totalPages
            };
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Failed to get paginated platforms');
        }
    }

    async getPlatformsByName(name: string, userId: string): Promise<IPlatformEntity[]> {
        try {
            return await platformRepository.findByName(name, userId);
        } catch (error) {
            throw new Error('Failed to get platforms by name');
        }
    }
}

export const platformService = new PlatformService();