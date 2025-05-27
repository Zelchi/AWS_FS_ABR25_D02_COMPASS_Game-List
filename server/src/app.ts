import express, { Application, Router } from 'express';
import cors from 'cors';

import account from './Account/AccountRouter';

class App {
    private app: Application;

    constructor() {
        this.app = express();
        this.setupMiddlewares();
        this.setupCors();
        this.setupRoutes();
        this.listenServer();
    }

    private setupMiddlewares(): void {
        this.app.use(express.json());
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

    public listenServer(): void {
        this.app.listen(8080, () => {
            console.log('Server is running on port 8080');
        });
    }

    public setupRoutes(): void {
        const router = Router();
        
        router.use('/v1/account', account);
        
        this.app.use('/api', router);
    }

    public getApp(): Application {
        return this.app;
    }
}

export default new App();