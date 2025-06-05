import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export class Auth {

    static generateToken(user: { id: string; email: string }): string {
        return jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET || 'default',
            { expiresIn: '24h' }
        );
    }

    static async verifyToken(token: string): Promise<{ id: string; email: string }> {
        try {
            return jwt.verify(token, process.env.JWT_SECRET || 'default') as { id: string; email: string };
        } catch (error) {
            throw new Error('Invalid token');
        }
    }

    static createAccountMiddleware() {
        return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            try {
                const authHeader = req.headers.authorization;
                const { userId } = req.body;

                if (userId) throw new Error('User ID should not be in the request body for this middleware');

                if (authHeader) {
                    const type = authHeader.split(' ')[0];
                    const token = authHeader.split(' ')[1];

                    if (type !== 'Bearer') {
                        res.status(401).json({ error: 'Invalid authorization type' });
                        return;
                    }

                    if (!token || token === 'null' || token === 'undefined') {
                        return next();
                    }

                    if (token) {
                        const decoded = await this.verifyToken(token);
                        req.body.userId = decoded.id;
                    }
                }

                return next();
            } catch (error) {
                res.status(401).json({ error: 'Invalid token' });
            }
        }
    }

    static createAuthMiddleware() {
        return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
                    const decoded = await Auth.verifyToken(token);
                    req.body.userId = decoded.id;
                    return next();
                }
            } catch (error) {
                res.status(401).json({ error: 'Invalid token' });
            }
        };
    }
}