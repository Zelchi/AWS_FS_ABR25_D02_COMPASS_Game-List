import express, { Router, Request, Response, NextFunction } from "express";
import { categoryController } from "./CategoryController";

class CategoryRouter {
    private router: Router;

    constructor() {
        this.router = express.Router();
        this.setupMiddlewares();
        this.setupRoutes();
    }

    private setupMiddlewares(): void {
        this.router.use((req: Request, res: Response, next: NextFunction) => {
            categoryController.middleware(req, res, next);
        });
    }

    private setupRoutes(): void {
        
        this.router.get("/", (req: Request, res: Response) => 
            categoryController.categoryGetByUserId(req, res)
        );

        this.router.post("/", (req: Request, res: Response) => 
            categoryController.categoryPost(req, res)
        );

        this.router.put("/:id", (req: Request, res: Response) => 
            categoryController.categoryUpdate(req, res)
        );

        this.router.delete("/:id", (req: Request, res: Response) => 
            categoryController.categoryDelete(req, res)
        );
    }

    public getRouter(): Router {
        return this.router;
    }

}

export default new CategoryRouter().getRouter();