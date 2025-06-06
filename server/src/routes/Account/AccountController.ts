import { Request, Response, NextFunction } from "express";
import { accountService } from "./AccountService";
import { AccountLoginDto, AccountRegisterDto } from "./AccountDto";
import { Auth } from "../../utils/auth";

export class AccountController {
    public middleware = Auth.createAccountMiddleware();

    async userPost(req: Request, res: Response): Promise<void> {
        try {
            const { name, email, password } = req.body;

            const registerDto = new AccountRegisterDto(name, email, password);
            const validationResult = registerDto.isValid();

            if (!validationResult.valid) {
                res.status(400).json({ errors: validationResult.errors });
                return;
            }

            const result = await accountService.register({ name, email, password });

            res.status(201).json(result);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    async userlogin(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;

            const loginDto = new AccountLoginDto(email, password);
            const validationResult = loginDto.isValid();

            if (!validationResult.valid) {
                res.status(400).json({ errors: validationResult.errors });
                return;
            }

            const result = await accountService.login({ email, password });
            res.status(200).json(result);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    async authUser(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.body;

            if (!userId) {
                res.status(400).json({ error: 'User ID is required' });
                return;
            }

            const user = await accountService.getUser(userId);

            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

}

export const accountController = new AccountController();