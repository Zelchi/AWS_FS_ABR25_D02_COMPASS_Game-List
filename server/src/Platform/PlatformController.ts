import { Request, Response, NextFunction } from 'express';
import { platformService } from './PlatformService';
import { PlatformRegisterDto, PlatformUpdateDto } from './PlatformDto';
import { Auth } from '../auth';

export class PlatformController {
    public middleware = Auth.createAuthMiddleware();

    async platformGetNameAll(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.body;

            if (!userId) {
                res.status(400).json({ error: 'User ID is required' });
                return;
            }

            const platforms = await platformService.getAllPlatforms(userId);
            res.status(200).json(platforms);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async platformGetById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { userId } = req.body;

            if (!id) {
                res.status(400).json({ error: 'Platform ID is required' });
                return;
            }

            const platform = await platformService.getPlatformById(id, userId);
            res.status(200).json(platform);
        } catch (error) {
            if (error instanceof Error && error.message === 'Platform not found') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    async platformPost(req: Request, res: Response): Promise<void> {
        try {
            const { userId, name, company, imageUrl } = req.body;

            const platformDto = new PlatformRegisterDto(
                userId,
                name,
                company,
                imageUrl
            );

            const searchByName = await platformService.getPlatformsByName(name, userId);
            if (searchByName.length > 0) {
                res.status(400).json({ error: 'Platform with this name already exists for this user' });
                return;
            }

            const validationResult = platformDto.isValid();
            if (!validationResult.valid) {
                res.status(400).json({ errors: validationResult.errors });
                return;
            }

            const platformData = platformDto.data();

            const result = await platformService.create(platformData);
            res.status(201).json(result);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    async platformUpdate(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { userId, name, company, imageUrl } = req.body;

            if (!id) {
                res.status(400).json({ error: 'Platform ID is required' });
                return;
            }

            const platformDto = new PlatformUpdateDto(
                name,
                company,
                imageUrl
            );

            const validationResult = platformDto.isValid();

            if (!validationResult.valid) {
                res.status(400).json({ errors: validationResult.errors });
                return;
            }

            const platformData = platformDto.data();

            const result = await platformService.update(id, userId, platformData);
            res.status(200).json(result);
        } catch (error) {
            if (error instanceof Error && error.message === 'Platform not found') {
                res.status(404).json({ error: error.message });
            } else if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    async platformDelete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { userId } = req.body;

            if (!id) {
                res.status(400).json({ error: 'Platform ID is required' });
                return;
            }

            const success = await platformService.delete(id, userId);

            if (!success) {
                res.status(404).json({ error: 'Platform not found' });
                return;
            }

            res.status(204).send();
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    async platformGetPaginated(req: Request, res: Response): Promise<void> {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const search = (req.query.search as string) || '';
            const sortBy = (req.query.sortBy as string) || 'updatedAt';
            const sortOrder = (req.query.sortOrder as 'asc' | 'desc') || 'desc';
            const { userId } = req.body;

            if (page < 1 || limit < 1 || limit > 100) {
                res.status(400).json({
                    error: 'Invalid pagination parameters. Use "page" >= 1 and "limit" between 1 and 100.'
                });
                return;
            }

            const validSortFields = ['name', 'company', 'updatedAt'];
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

            const paginatedResult = await platformService.getPaginated(
                page,
                limit,
                search,
                sortBy,
                sortOrder,
                userId
            );
            res.status(200).json(paginatedResult);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async platformSearchByName(req: Request, res: Response): Promise<void> {
        try {
            const name = req.query.name as string;
            const { userId } = req.body;

            if (!name || name.trim() === '') {
                res.status(400).json({ error: 'Name parameter is required' });
                return;
            }

            const platforms = await platformService.getPlatformsByName(name, userId);
            res.status(200).json(platforms);
        } catch (error) {
            if (error instanceof Error && error.message === 'No platforms found with this name') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
}

export const platformController = new PlatformController();