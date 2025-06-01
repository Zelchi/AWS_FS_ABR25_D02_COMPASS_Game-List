import { prisma } from '../db';
import { IGameEntity } from '../Game/GameEntity';
import { ICategoryEntity } from '../Category/CategoryEntity';
import { IPlatformEntity } from '../Platform/PlatformEntity';
import { IDashboardEntity } from './DashboardEntity';

class DashboardRepository {

    async allData(userId: string): Promise<{
        games: Pick<IGameEntity, 'price' | 'rating' | 'status' | 'favorite'>[];
        categories: { id: string, name: string, _count: { games: number } }[];
        platforms: { id: string, name: string, _count: { games: number } }[];
    }> {
        try {
            const [games, categories, platforms] = await Promise.all([
                prisma.game.findMany({
                    where: { userId, deletedAt: null },
                    select: {
                        price: true,
                        rating: true,
                        status: true,
                        favorite: true
                    }
                }),
                prisma.category.findMany({
                    where: { userId, deletedAt: null },
                    select: {
                        id: true,
                        name: true,
                        _count: {
                            select: { games: true }
                        }
                    }
                }),
                prisma.platform.findMany({
                    where: { userId, deletedAt: null },
                    select: {
                        id: true,
                        name: true,
                        _count: {
                            select: { games: true }
                        }
                    }
                }),
            ]);

            return { games, categories, platforms };
        } catch (error) {
            console.error('Error fetching user data:', error);
            throw new Error('Failed to fetch user data');
        }
    }

    async saveDashboard(dashboardData: IDashboardEntity): Promise<IDashboardEntity> {
        try {
            const { userId, ...dashboardDataWithoutUserId } = dashboardData;
            return await prisma.dashboard.upsert({
                where: { userId },
                update: dashboardDataWithoutUserId,
                create: { ...dashboardDataWithoutUserId, userId: userId! }
            });
        } catch (error) {
            console.error('Error saving dashboard:', error);
            throw new Error('Failed to save dashboard');
        }
    }
    
    async getDashboard(userId: string): Promise<IDashboardEntity | null> {
        try {
            return await prisma.dashboard.findUnique({
                where: { userId }
            });
        } catch (error) {
            console.error('Error fetching dashboard:', error);
            throw new Error('Failed to fetch dashboard');
        }
    }
    
    
}

export const dashboardRepository = new DashboardRepository();