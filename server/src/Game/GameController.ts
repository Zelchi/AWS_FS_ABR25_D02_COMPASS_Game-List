import { Request, Response, NextFunction } from 'express';
import { accountService } from '../Account/AccountService';
import { gameService } from './GameService';
import { GameRegisterDto, GameUpdateDto } from './GameDto';

export class GameController {
    async middleware(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader) {
                res.status(401).json({ error: 'No authorization header provided' });
                return;
            }

            const [bearer, token] = authHeader.split(' ');

            if (!bearer || !token || bearer !== 'Bearer') {
                res.status(401).json({ error: 'Invalid authorization format' });
                return;
            }

            const decoded = await accountService.verifyToken(token);

            if (!decoded || !decoded.id) {
                res.status(401).json({ error: 'Invalid token' });
                return;
            }

            req.body.userId = decoded.id;
            next();

        } catch (error) {
            res.status(401).json({ error: 'Authentication failed' });
        }
    }

    async gamePost(req: Request, res: Response): Promise<void> {
        try {
            const { userId, name, description, imageUrl, status, favorite, rating, acquisDate, finishDate, categories, platforms } = req.body;

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

    async gameGetPaginated(req: Request, res: Response): Promise<void> {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const sortBy = (req.query.sortBy as string) || 'createdAt';
            const categoryBy = (req.query.categoryBy as string) || 'all';
            const platformBy = (req.query.platformBy as string) || 'all';
            const isFavorite = req.query.isFavorite === 'true' ? true : false;
            const sortOrder = (req.query.sortOrder as 'asc' | 'desc') || 'desc';
            const { userId } = req.body;

            if (page < 1 || limit < 1 || limit > 100) {
                res.status(400).json({
                    error: 'Invalid pagination parameters. Use "page" >= 1 and "limit" between 1 and 100.'
                });
                return;
            }

            const validSortFields = ['name', 'createdAt', 'acquisDate', 'status', 'rating'];
            if (!validSortFields.includes(sortBy)) {
                res.status(400).json({
                    error: `Invalid sort field. Allowed values: ${validSortFields.join(', ')}`
                });
                return;
            }

            if (sortOrder !== 'asc' && sortOrder !== 'desc') {
                res.status(400).json({
                    error: 'Invalid sort order. Use "asc" or "desc".'
                });
                return;
            }

            const paginatedResult = await gameService.getPaginated(page, limit, sortBy, categoryBy, platformBy, isFavorite, sortOrder, userId);
            res.status(200).json(paginatedResult);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
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
}

export const gameController = new GameController();