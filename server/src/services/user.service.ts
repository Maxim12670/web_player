import IUser from "../models/user.model";
import { UserRepository } from "../repositories/user.repository";

export class UserService {
    static async getInfo(id: number): Promise<IUser> {
        const user = await UserRepository.getInfo(id);
        if (!user) throw new Error("Пользователь не найден!");

        return user;
    }
}
