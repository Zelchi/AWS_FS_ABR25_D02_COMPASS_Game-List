import express, { Router, Request, Response, NextFunction } from "express";
import { dashboardController } from "./DashboardController";

class DashboardRouter {
    private router: Router;

    constructor() {
        this.router = express.Router();
        this.setupMiddlewares();
        this.setupRoutes();
    }

    private setupMiddlewares(): void {
        this.router.use((req: Request, res: Response, next: NextFunction) => {
            dashboardController.middleware(req, res, next);
        });
    }

    private setupRoutes(): void {
        // this.router.get("/", (req: Request, res: Response) => 
        //     dashboardController.getRelatory(req, res)
        // );

        // this.router.get("/ask", (req: Request, res: Response) => 
        //     dashboardController.getAsk(req, res)
        // );
    }

    public getRouter(): Router {
        return this.router;
    }
}

export default new DashboardRouter().getRouter();