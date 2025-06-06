import express, { Application, Router, Request, Response, NextFunction } from 'express';
import cors from 'cors';

import account from './routes/Account/AccountRouter';
import category from './routes/Category/CategoryRouter';
import dashboard from './routes/Dashboard/DashboardRouter';
import game from './routes/Game/GameRouter';
import platform from './routes/Platform/PlatformRouter';

class App {
    private app: Application;

    constructor() {
        this.app = express();
        this.setupMiddlewares();
        this.setupCors();
        this.setupRoutes();
        this.setupErrorHandlers();
        this.listenServer();
    }

    private setupCors(): void {
        const allowedOrigins = ['http://localhost:5173', 'http://localhost:4173'];
        this.app.use(cors({
            origin: allowedOrigins,
            allowedHeaders: ['Content-Type', 'Authorization'],
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            credentials: true,
            optionsSuccessStatus: 200,
        }));
    }

    private setupMiddlewares(): void {
        this.app.use(express.json());
    }

    private setupErrorHandlers(): void {
        this.app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
            if (err instanceof SyntaxError && 'body' in err && err.message.includes('JSON')) {
                res.status(400).json({
                    error: 'Invalid JSON format',
                    details: 'Please check your request body for syntax errors'
                });
            } else {
                next(err);
            }
        });
    }

    public setupRoutes(): void {
        const router = Router();

        router.use('/v1/account', account);
        router.use('/v1/category', category);
        router.use('/v1/dashboard', dashboard);
        router.use('/v1/game', game);
        router.use('/v1/platform', platform);

        this.app.use('/api', router);
    }

    public listenServer(): void {
        this.app.listen(8080, () => {
            console.log('Server is running on port 8080');
        });
    }
    

    public getApp(): Application {
        return this.app;
    }
}

export default new App();