import { gameRepository } from './GameRepository';
import { IGameEntity, IGameRegister } from './GameEntity';

class GameService {

    async register(data: IGameRegister): Promise<void> {
        await gameRepository.create(data);
    }

    async getAll(): Promise<IGameEntity[]> {
        return await gameRepository.findAll();
    }

    async getById(id: string): Promise<IGameEntity | null> {
        const game = await gameRepository.findById(id);
        if (!game) {
            throw new Error('Game not found');
        }
        return game;
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

    async getByGenre(genre: string): Promise<IGameEntity[] | null> {
        const games = await gameRepository.findByGenre(genre);
        if (games.length === 0) {
            throw new Error('No games found for this genre');
        }
        return games;
    }

    async getByName(name: string): Promise<IGameEntity[] | null> {
        const games = await gameRepository.findByName(name);
        if (games.length === 0) {
            throw new Error('No games found with this name');
        }
        return games;
    }

    async getByReleaseDate(releaseDate: Date): Promise<IGameEntity[] | null> {
        const games = await gameRepository.findByReleaseDate(releaseDate);
        if (games.length === 0) {
            throw new Error('No games found for this release date');
        }
        return games;
    }
}

export const gameService = new GameService();