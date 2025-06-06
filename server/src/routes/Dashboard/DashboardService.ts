import { dashboardRepository } from './DashboardRepository';
import { IDashboardEntity } from './DashboardEntity';

class DashboardService {

    private readonly UPDATE_INTERVAL_MINUTES = 20;

    private async updateDashboardData(userId: string): Promise<IDashboardEntity> {
        try {
            const { games, categories, platforms } = await dashboardRepository.allData(userId);

            const totalPrice = games.reduce((sum, game) => sum + (game.price || 0), 0);

            let topPlatform = null;
            if (platforms.length > 0) {
                const maxGamesCount = Math.max(...platforms.map(p => p._count.games));
                const topPlatforms = platforms.filter(p => p._count.games === maxGamesCount);
                const randomIndex = Math.floor(Math.random() * topPlatforms.length);
                topPlatform = topPlatforms[randomIndex];
            }

            let topCategory = null;
            if (categories.length > 0) {
                const maxGamesCount = Math.max(...categories.map(c => c._count.games));
                const topCategories = categories.filter(c => c._count.games === maxGamesCount);
                const randomIndex = Math.floor(Math.random() * topCategories.length);
                topCategory = topCategories[randomIndex];
            }

            const avgRating = games.length > 0 ?
                games.reduce((sum, game) => sum + (game.rating || 0), 0) / games.length :
                0;

            const totalFavorites = games.filter(game => game.favorite).length;
            const totalAbandoned = games.filter(game => game.status === 'abandoned').length;
            const totalDone = games.filter(game => game.status === 'done').length;
            const totalPlaying = games.filter(game => game.status === 'playing').length;

            const totalGames = games.length;
            const totalCategories = categories.length;
            const totalPlatforms = platforms.length;

            const dashboardData = {
                userId,
                totalPrice,
                topPlatform: topPlatform ? JSON.stringify({
                    id: topPlatform.id,
                    name: topPlatform.name,
                    imageUrl: topPlatform.imageUrl
                }) : null,
                topCategory: topCategory ? JSON.stringify({
                    id: topCategory.id,
                    name: topCategory.name
                }) : null,
                avgRating,
                totalFavorites,
                totalAbandoned,
                totalDone,
                totalPlaying,
                totalGames,      
                totalCategories,  
                totalPlatforms, 
                lastUpdated: new Date()
            };

            return await dashboardRepository.saveDashboard(dashboardData);
        } catch (error) {
            console.error('Error updating dashboard data:', error);
            throw new Error('Failed to update dashboard data');
        }
    }

    private async getDashboardData(userId: string): Promise<IDashboardEntity> {
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

    public async processRelatoryData(userId: string): Promise<IDashboardEntity> {
        return await this.getDashboardData(userId);
    }

    public async getPlayingGamesNotUpdated(userId: string): Promise<Array<{id: string, name: string, imageUrl: string}>> {
        try {

            const playingGames = await dashboardRepository.getPlayingGamesWithUpdateStatus(userId);
            
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            
            const notUpdatedGames = playingGames.filter(game => 
                new Date(game.updatedAt) < sevenDaysAgo
            );
            
            return notUpdatedGames.map(game => ({
                id: game.id,
                name: game.name,
                imageUrl: game.imageUrl
            }));
        } catch (error) {
            console.error('Error retrieving stale playing games:', error);
            throw new Error('Failed to retrieve stale playing games');
        }
    }
}

export const dashboardService = new DashboardService();