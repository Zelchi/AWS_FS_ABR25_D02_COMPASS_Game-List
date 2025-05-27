import { Request, Response, NextFunction } from "express";
import { accountService } from "./AccountService";

export class AccountController {

    async middleware(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader || req.path === '/reg' || req.path === '/log') {
                next();
                return;
            }

            const token = authHeader.split(' ')[1];
            if (!token) {
                res.status(401).json({ error: 'No token provided' });
                return;
            }

            const decoded = await accountService.verifyToken(token);
            req.body.userId = decoded.id;
            next();
        } catch (error) {
            res.status(401).json({ error: 'Invalid token' });
        }
    }

    async userPost(req: Request, res: Response): Promise<void> {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                res.status(400).json({ error: 'Name, email and password are required' });
                return;
            }

            const result = await accountService.register({ name, email, password });
            res.status(201).json(result);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    async userlogin(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                res.status(400).json({ error: 'Email and password are required' });
                return;
            }

            const result = await accountService.login({ email, password });
            res.status(200).json(result);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
    
    async getUserProfile(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.id;

            if (!userId) {
                res.status(400).json({ error: 'User ID is required' });
                return;
            }

            const user = await accountService.getUserById(userId);

            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    
}

export const accountController = new AccountController();