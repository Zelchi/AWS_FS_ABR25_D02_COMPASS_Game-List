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
            const { name, genre, userId, description, releaseDate, imageUrl, categories } = req.body;

            const gameDto = new GameRegisterDto(
                name,
                genre,
                description,
                userId,
                releaseDate,
                imageUrl,
                categories
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

    async gameGetAll(req: Request, res: Response): Promise<void> {
        try {
            const games = await gameService.getAll();
            res.status(200).json(games);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
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

    async gameUpdate(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { name, genre, description, releaseDate, imageUrl, categories } = req.body;

            if (!id) {
                res.status(400).json({ error: 'Game ID is required' });
                return;
            }

            const gameDto = new GameUpdateDto(
                name,
                genre,
                description,
                releaseDate,
                imageUrl,
                categories
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
}

export const gameController = new GameController();