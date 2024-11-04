import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
    static async registration(req: Request, res: Response) {
        try {
            const { email, login, password } = req.body;
            const result = await AuthService.registration(email, login, password);
            res.status(201).json(result);
        } catch (error) {
            console.log(error);
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const result = await AuthService.login(email, password);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
        }
    }
}
