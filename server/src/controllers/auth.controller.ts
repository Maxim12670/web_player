import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
    static async registration(req: Request, res: Response) {
        try {
            const { email, login, password } = req.body;
            const response = await AuthService.registration(email, login, password);
            if (response) res.status(200).json(response);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const response = await AuthService.login(email, password);
            res.status(200).json(response);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}
