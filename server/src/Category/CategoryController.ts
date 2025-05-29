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

    async categoryPost(req: Request, res: Response): Promise<void> {
        try {
            const { name, description, userId } = req.body;

            const categoryDto = new CategoryRegisterDto(name, description, userId);
            const validationResult = categoryDto.isValid();

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
            const { name, description } = req.body;

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
            const result = await categoryService.update(id, categoryData);

            res.status(200).json(result);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    async categoryGetByUserId(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.body;

            if (!userId) {
                res.status(400).json({ error: 'User ID is required' });
                return;
            }

            const categories = await categoryService.getCategoriesByUserId(userId);

            if (!categories || categories.length === 0) {
                res.status(404).json({ error: 'No categories found for this user' });
                return;
            }

            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async categoryDelete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            if (!id) {
                res.status(400).json({ error: 'Category ID is required' });
                return;
            }

            const result = await categoryService.getCategoriesByUserId(id);

            if (!result) {
                res.status(404).json({ error: 'Category not found' });
                return;
            }

            res.status(200).json({ message: 'Category deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export const categoryController = new CategoryController();