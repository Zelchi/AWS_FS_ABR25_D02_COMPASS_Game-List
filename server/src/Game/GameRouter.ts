import express, { Router, Request, Response, NextFunction } from "express";
import { gameController } from "./GameController";

class GameRouter {
    private router: Router;

    constructor() {
        this.router = express.Router();
        this.setupMiddlewares();
        this.setupRoutes();
    }

    private setupMiddlewares(): void {
        this.router.use((req: Request, res: Response, next: NextFunction) => {
            gameController.middleware(req, res, next);
        });
    }

    private setupRoutes(): void {

        this.router.get("/:id", (req: Request, res: Response) => 
            gameController.gameGetById(req, res)
        );

        this.router.get("/page", (req: Request, res: Response) => 
            gameController.gameGetPaginated(req, res)
        );
        
        this.router.get("/search", (req: Request, res: Response) => 
            gameController.gameSearchByName(req, res)
        );

        this.router.post("/", (req: Request, res: Response) => 
            gameController.gamePost(req, res)
        );

        this.router.put("/:id", (req: Request, res: Response) => 
            gameController.gameUpdate(req, res)
        );

        this.router.delete("/:id", (req: Request, res: Response) => 
            gameController.gameDelete(req, res)
        );

    }

    public getRouter(): Router {
        return this.router;
    }
}

export default new GameRouter().getRouter();