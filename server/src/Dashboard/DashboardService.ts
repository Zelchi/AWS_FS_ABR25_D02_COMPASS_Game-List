import { dashboardRepository } from './DashboardRepository';
import { IDashboardEntity } from './DashboardEntity';

class DashboardService {
    
    private readonly UPDATE_INTERVAL_MINUTES = 20;
    
    async getDashboardData(userId: string): Promise<IDashboardEntity> {
        try {
            const existingDashboard = await dashboardRepository.getDashboard(userId);
            
            if (existingDashboard && existingDashboard.lastUpdated) {
                const lastUpdate = new Date(existingDashboard.lastUpdated);
                const currentTime = new Date();
                const minutesSinceLastUpdate = (currentTime.getTime() - lastUpdate.getTime()) / (1000 * 60);
                
                if (minutesSinceLastUpdate < this.UPDATE_INTERVAL_MINUTES) {
                    return existingDashboard;
                }
            }
            
            return await this.updateDashboardData(userId);
        } catch (error) {
            console.error('Error retrieving dashboard data:', error);
            throw new Error('Failed to retrieve dashboard data');
        }
    }

    async updateDashboardData(userId: string): Promise<IDashboardEntity> {
        try {
            const { games, categories, platforms } = await dashboardRepository.allData(userId);

            const totalPrice = games.reduce((sum, game) => sum + (game.price || 0), 0);
            
            const topPlatform = platforms.length > 0 ? 
                platforms.reduce((prev, current) => 
                    (prev._count.games > current._count.games) ? prev : current).name : 
                null;
                
            const topCategory = categories.length > 0 ? 
                categories.reduce((prev, current) => 
                    (prev._count.games > current._count.games) ? prev : current).name : 
                null;
                
            const avgRating = games.length > 0 ? 
                games.reduce((sum, game) => sum + (game.rating || 0), 0) / games.length : 
                0;
                
            const totalFavorites = games.filter(game => game.favorite).length;
            const totalAbandoned = games.filter(game => game.status === 'abandoned').length;
            const totalDone = games.filter(game => game.status === 'done').length;
            const totalPlaying = games.filter(game => game.status === 'playing').length;
            
            const dashboardData = {
                userId,
                totalPrice,
                topPlatform,
                topCategory,
                avgRating,
                totalFavorites,
                totalAbandoned,
                totalDone,
                totalPlaying,
                lastUpdated: new Date()
            };
            
            return await dashboardRepository.saveDashboard(dashboardData);
        } catch (error) {
            console.error('Error updating dashboard data:', error);
            throw new Error('Failed to update dashboard data');
        }
    }

    async processRelatoryData(userId: string): Promise<IDashboardEntity> {
        return await this.getDashboardData(userId);
    }
}

export const dashboardService = new DashboardService();