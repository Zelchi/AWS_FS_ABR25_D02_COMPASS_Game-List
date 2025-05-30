import express, { Router, Request, Response, NextFunction } from "express";
import { platformController } from "./PlatformController";

class PlatformRouter {
    private router: Router;

    constructor() {
        this.router = express.Router();
        this.setupMiddlewares();
        this.setupRoutes();
    }

    private setupMiddlewares(): void {
        this.router.use((req: Request, res: Response, next: NextFunction) => {
            platformController.middleware(req, res, next);
        });
    }

    private setupRoutes(): void {

        this.router.get("/page", (req: Request, res: Response) => 
            platformController.platformGetPaginated(req, res)
        );
        
        this.router.get("/search", (req: Request, res: Response) => 
            platformController.platformSearchByName(req, res)
        );

        this.router.get("/:id", (req: Request, res: Response) => 
            platformController.platformGetById(req, res)
        );
        
        this.router.post("/", (req: Request, res: Response) => 
            platformController.platformPost(req, res)
        );

        this.router.put("/:id", (req: Request, res: Response) => 
            platformController.platformUpdate(req, res)
        );

        this.router.delete("/:id", (req: Request, res: Response) => 
            platformController.platformDelete(req, res)
        );
    }

    public getRouter(): Router {
        return this.router;
    }
}

export default new PlatformRouter().getRouter();