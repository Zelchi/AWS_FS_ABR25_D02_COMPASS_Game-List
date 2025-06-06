import { Request, Response, NextFunction } from "express";
import { dashboardService } from "./DashboardService";
import { Auth } from "../../utils/auth";

class DashboardController {
    public middleware = Auth.createAuthMiddleware();

    async getRelatory(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.body;
            if (!userId) throw new Error('User ID is required');

            const dashboardData = await dashboardService.processRelatoryData(userId);
            res.status(200).json(dashboardData);
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    async getAsk(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.body;
            if (!userId) throw new Error('User ID is required');

            const dashboardData = await dashboardService.getPlayingGamesNotUpdated(userId);
            res.status(200).json(dashboardData);
        } catch (error) {
            res.status(500).json({ error });
        }
    }
}

export const dashboardController = new DashboardController();