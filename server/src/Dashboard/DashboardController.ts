import { Request, Response, NextFunction } from "express";
import { dashboardService } from "./DashboardService";
import { accountService } from "../Account/AccountService";

class DashboardController {
    async middleware(req: Request, res: Response, next: NextFunction): Promise<void> {
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
                const decoded = await accountService.verifyToken(token);
                req.body.userId = decoded.id;
                return next();
            }
        } catch (error) {
            res.status(401).json({ error: 'Invalid token' });
        }
    }

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