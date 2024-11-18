import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
    static async getInfo(req: Request, res: Response) {
        try {
            const { id } = req.body;
            const response = await UserService.getInfo(id);
            if (response) res.status(200).json(response);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}
