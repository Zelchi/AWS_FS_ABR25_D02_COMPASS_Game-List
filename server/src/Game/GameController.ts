import { Request, Response, NextFunction } from 'express';
import { accountService } from '../Account/AccountService';
import { gameService } from './GameService';
import { GameRegisterDto, GameUpdateDto } from './GameDto';

export class GameController {
    async middleware(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const authHeader = req.headers.authorization;
            const { userId } = req.body;

            if (userId) throw new Error('User ID should not be in the request body for this middleware');
            if (!authHeader) throw new Error('Authorization header should not be present in the request for this middleware');

            const type = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];

            if (type !== 'Bearer') {
                res.status(401).json({ error: 'Invalid authorization type' });
                return;
            }

            if (!token || token === 'null' || token === 'undefined') {
                res.status(401).json({ error: 'Token is required' });
                return;
            }

            if (token) {
                const decoded = await accountService.verifyToken(token);
                req.body.userId = decoded.id;
                return next();
            }
        } catch (error) {
            res.status(401).json({ error: 'Invalid token' });
        }
    }

    async gamePost(req: Request, res: Response): Promise<void> {
        try {
            const { userId, name, description, imageUrl, status, favorite, rating, acquisDate, finishDate, price, categories, platforms } = req.body;

            const gameDto = new GameRegisterDto(
                userId,
                name,
                description,
                imageUrl,
                acquisDate,
                categories,
                platforms,
                status,
                favorite,
                rating,
                price,
                finishDate
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
            const { name, description, imageUrl, status, favorite, acquisDate, finishDate, categories, platforms } = req.body;

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
                acquisDate,
                finishDate,
                categories,
                platforms
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
            const statusBy = (req.query.statusBy as string);
            const isFavorite = req.query.isFavorite === 'true' ? true : false;
            const sortOrder = (req.query.sortOrder as 'asc' | 'desc') || 'desc';
            const { userId } = req.body;

            if (page < 1 || limit < 1 || limit > 100) {
                res.status(400).json({
                    error: 'Invalid pagination parameters. Use "page" >= 1 and "limit" between 1 and 100.'
                });
                return;
            }

            const validStatusFields = ["playing", "done", "abandoned"]
            const validSortFields = ['name', 'updatedAt', 'acquisDate', 'status', 'rating', 'price', 'finishDate'];
            if (!validSortFields.includes(sortBy)) {
                res.status(400).json({
                    error: `Invalid sort field. Allowed values: ${validSortFields.join(', ')}`
                });
                return;
            }

            if (statusBy && !validStatusFields.includes(statusBy)) {
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