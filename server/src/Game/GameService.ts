import { IGameEntity, IGameRegister } from './GameEntity';
import { gameRepository } from './GameRepository';

class GameService {

    async create(data: IGameRegister): Promise<IGameEntity> {
        try {
            return await gameRepository.create(data);
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Failed to create game');
        }
    }

    async update(id: string, data: Partial<IGameEntity>): Promise<IGameEntity | null> {
        const existingGame = await gameRepository.findById(id);
        if (!existingGame) {
            throw new Error('Game not found');
        }

        return await gameRepository.update(id, data);
    }

    async delete(id: string): Promise<void> {
        const existingGame = await gameRepository.findById(id);
        if (!existingGame) {
            throw new Error('Game not found');
        }
        await gameRepository.delete(id);
    }

    async getById(id: string): Promise<IGameEntity | null> {
        const game = await gameRepository.findById(id);
        if (!game) {
            throw new Error('Game not found');
        }
        return game;
    }

    async getPaginated(
        page: number, 
        limit: number, 
        sortBy: string, 
        categoryBy: string, 
        platformBy: string, 
        isFavorite: boolean,
        sortOrder: 'asc' | 'desc', 
        userId: string
    ): Promise<{
        games: IGameEntity[],
        total: number,
        currentPage: number,
        totalPages: number,
    }> {
        const { games, total } = await gameRepository.findPaginated(page, limit, sortBy, categoryBy, platformBy, isFavorite ,sortOrder, userId);
        const totalPages = Math.ceil(total / limit);

        return {
            games,
            total,
            currentPage: page,
            totalPages
        };
    }

    async getByName(name: string, userId: string): Promise<IGameEntity[]> {
        const games = await gameRepository.findByName(name, userId);
        if (games.length === 0) {
            throw new Error('No games found with this name');
        }
        return games;
    }
}

export const gameService = new GameService();