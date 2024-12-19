import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
    static async getInfo(req: Request, res: Response) {
        try {
            const { id } = req.query;
            const response = await UserService.getInfo(Number(id));
            if (response) res.status(200).json(response);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}
