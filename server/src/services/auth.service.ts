import IPerson from "../models/user.model";
import { UserRepository } from "../repositories/user.repository";

export class AuthService {
    static async registration(email: string, login: string, password: string) {
        const existingUser = await UserRepository.findEmail(email);
        if (existingUser) {
            throw new Error("Пользователя не существует!!!");
        }

        const user = await UserRepository.createUser(email, login, password);

        return user;
    }

    static async login(email: string, password: string) {
        const user = await UserRepository.findEmail(email);

        if (!user) {
            throw new Error("Ошибка!!!");
        }

        return user;
    }
}
