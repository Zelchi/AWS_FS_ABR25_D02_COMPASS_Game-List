import express, { Router, Request, Response, NextFunction } from "express";
import { accountController } from "./AccountController";

class AccountRouter {

    private router: Router;

    constructor() {
        this.router = express.Router();
        this.setupMiddlewares();
        this.setupRoutes();
    }

    private setupMiddlewares(): void {
        this.router.use((req: Request, res: Response, next: NextFunction) => 
            accountController.middleware(req, res, next)
        );
    }

    private setupRoutes(): void {
        this.router.post("/reg", (req: Request, res: Response) => 
            accountController.userPost(req, res)
        );
        
        this.router.post("/log", (req: Request, res: Response) => 
            accountController.userlogin(req, res)
        );
        
        this.router.get("/:id", (req: Request, res: Response) => 
            accountController.getUserProfile(req, res)
        );
    }

    public getRouter(): Router {
        return this.router;
    }
}

export default new AccountRouter().getRouter();