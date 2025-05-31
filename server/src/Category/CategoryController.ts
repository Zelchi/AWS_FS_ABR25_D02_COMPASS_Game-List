import { Request, Response, NextFunction } from "express";
import { CategoryRegisterDto, CategoryUpdateDto } from "./CategoryDto";
import { categoryService } from "./CategoryService";
import { accountService } from "../Account/AccountService";

export class CategoryController {
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

    async categoryGetNameAll(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.body;

            if (!userId) {
                res.status(400).json({ error: 'User ID is required' });
                return;
            }

            const categories = await categoryService.getAllCategories(userId);

            if (categories.length === 0) {
                res.status(404).json({ error: 'No categories found for this user' });
                return;
            }

            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async categoryGetById(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.body;
            const { id } = req.params;

            if (!userId || !id) {
                res.status(400).json({ error: 'User ID is required' });
                return;
            }

            const category = await categoryService.getCategoryById(id, userId);

            if (!category) {
                res.status(404).json({ error: 'No category found for this user' });
                return;
            }

            res.status(200).json(category);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async categoryPost(req: Request, res: Response): Promise<void> {
        try {
            const { name, description, userId } = req.body;

            const categoryDto = new CategoryRegisterDto(name, description, userId);
            const validationResult = categoryDto.isValid();

            const searchByName = await categoryService.getCategoriesByName(name, userId);
            if (searchByName.length > 0) {
                res.status(400).json({ error: 'Category with this name already exists' });
                return;
            }

            if (!validationResult.valid) {
                res.status(400).json({ errors: validationResult.errors });
                return;
            }

            const categoryData = categoryDto.data();
            const result = await categoryService.create(categoryData);

            res.status(201).json(result);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    async categoryUpdate(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { name, description, userId } = req.body;

            const categoryDto = new CategoryUpdateDto(name, description);
            const validationResult = categoryDto.isValid();

            if (!validationResult.valid) {
                res.status(400).json({ errors: validationResult.errors });
                return;
            }

            if (!id) {
                res.status(400).json({ error: 'Category ID is required' });
                return;
            }

            const categoryData = categoryDto.data();
            const result = await categoryService.update(id, userId, categoryData);

            res.status(200).json(result);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    async categoryDelete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { userId } = req.body;

            if (!id || !userId) {
                res.status(400).json({ error: 'Category ID is required' });
                return;
            }

            const result = await categoryService.delete(id, userId);

            if (!result) {
                res.status(404).json({ error: 'Category not found' });
                return;
            }

            res.status(204).json({ message: 'Category deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async categoryGetPaginated(req: Request, res: Response): Promise<void> {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const search = (req.query.search as string) || '';
            const sortBy = (req.query.sortBy as string) || 'createdAt';
            const sortOrder = (req.query.sortOrder as 'asc' | 'desc') || 'desc';
            const { userId } = req.body;

            if (page < 1 || limit < 1 || limit > 100) {
                res.status(400).json({
                    error: 'Invalid pagination parameters. Page must be >= 1 and limit between 1 and 100.'
                });
                return;
            }

            const validSortFields = ['name', 'createdAt', 'description'];
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

            const paginatedResult = await categoryService.getPaginated(page, limit, search, sortBy, sortOrder, userId);
            res.status(200).json(paginatedResult);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async categorySearchByName(req: Request, res: Response): Promise<void> {
        try {
            const name = req.query.name as string;
            const { userId } = req.body;

            if (!name || name.trim() === '') {
                res.status(400).json({ error: 'Name parameter is required' });
                return;
            }

            const categories = await categoryService.getCategoriesByName(name, userId);
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export const categoryController = new CategoryController();