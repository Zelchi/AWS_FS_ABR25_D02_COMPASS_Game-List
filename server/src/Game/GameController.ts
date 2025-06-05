import { Request, Response } from 'express';
import { gameService } from './GameService';
import { GameRegisterDto, GameUpdateDto } from './GameDto';
import { Auth } from '../auth';

export class GameController {
    public middleware = Auth.createAuthMiddleware();

    async gamePost(req: Request, res: Response): Promise<void> {
        try {
            const {
                userId, name, description, imageUrl, status, favorite,
                rating, acquisDate, finishDate, releaseDate, price,
                categories, platforms
            } = req.body;

            const gameDto = new GameRegisterDto(
                userId,
                name,
                description,
                imageUrl,
                status,
                favorite,
                rating,
                price,
                acquisDate,
                finishDate,
                releaseDate,
                categories,
                platforms,
            );

            const validationResult = gameDto.isValid();

            if (!validationResult.valid) {
                res.status(400).json({ errors: validationResult.errors });
                return;
            }

            const gameData = gameDto.data();

            const result = await gameService.create(gameData);
            res.status(201).json(result);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    async gameUpdate(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const {
                name, description, imageUrl, status, favorite,
                acquisDate, finishDate, releaseDate, categories,
                platforms, rating, price
            } = req.body;

            if (!id) {
                res.status(400).json({ error: 'Game ID is required' });
                return;
            }

            const gameDto = new GameUpdateDto(
                name,
                description,
                imageUrl,
                status,
                favorite,
                rating,
                price,
                acquisDate,
                finishDate,
                releaseDate,
                categories,
                platforms,
            );

            const validationResult = gameDto.isValid();

            if (!validationResult.valid) {
                res.status(400).json({ errors: validationResult.errors });
                return;
            }

            const gameData = gameDto.data();

            const result = await gameService.update(id, gameData);
            res.status(200).json(result);
        } catch (error) {
            if (error instanceof Error && error.message === 'Game not found') {
                res.status(404).json({ error: error.message });
            } else if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    async gameDelete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            if (!id) {
                res.status(400).json({ error: 'Game ID is required' });
                return;
            }

            await gameService.delete(id);
            res.status(204).send();
        } catch (error) {
            if (error instanceof Error && error.message === 'Game not found') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    async gameGetById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            if (!id) {
                res.status(400).json({ error: 'Game ID is required' });
                return;
            }

            const game = await gameService.getById(id);
            res.status(200).json(game);
        } catch (error) {
            if (error instanceof Error && error.message === 'Game not found') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    async gameSearchByName(req: Request, res: Response): Promise<void> {
        try {
            const name = req.query.name as string;
            const { userId } = req.body;

            if (!name || name.trim() === '') {
                res.status(400).json({ error: 'Name parameter is required' });
                return;
            }

            const games = await gameService.getByName(name, userId);
            res.status(200).json(games);
        } catch (error) {
            if (error instanceof Error && error.message === 'No games found with this name') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    async gameGetPaginated(req: Request, res: Response): Promise<void> {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const search = (req.query.search as string) || '';
            const sortBy = (req.query.sortBy as string) || 'updatedAt';
            const categoryBy = (req.query.categoryBy as string) || '';
            const platformBy = (req.query.platformBy as string) || '';
            const statusBy = (req.query.statusBy as string) || '';
            const isFavorite = req.query.isFavorite === 'true' ? true : false;
            const sortOrder = (req.query.sortOrder as 'asc' | 'desc') || 'desc';
            const { userId } = req.body;

            if (page < 1 || limit < 1 || limit > 100) {
                res.status(400).json({
                    error: 'Invalid pagination parameters. Use "page" >= 1 and "limit" between 1 and 100.'
                });
                return;
            }

            const validSortFields = ['name', 'updatedAt', 'acquisDate', 'status', 'rating', 'price', 'finishDate'];
            if (sortBy && !validSortFields.includes(sortBy)) {
                res.status(400).json({
                    error: `Invalid sort field. Allowed values: ${validSortFields.join(', ')}`
                });
                return;
            }

            const validStatusFields = ["playing", "done", "abandoned"];
            if (statusBy && !validStatusFields.includes(statusBy.toLowerCase())) {
                res.status(400).json({
                    error: `Invalid status field. Allowed values: ${validStatusFields.join(', ')}`
                });
                return;
            }

            if (sortOrder !== 'asc' && sortOrder !== 'desc') {
                res.status(400).json({
                    error: 'Invalid sort order. Use "asc" or "desc".'
                });
                return;
            }

            const paginatedResult = await gameService.getPaginated(
                page,
                limit,
                search,
                sortBy,
                categoryBy,
                platformBy,
                statusBy.toLowerCase(),
                isFavorite,
                sortOrder,
                userId
            );

            res.status(200).json(paginatedResult);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export const gameController = new GameController();