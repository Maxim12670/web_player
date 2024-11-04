export default interface IUser {
    user_id: number;
    login: string;
    email: string;
    password: string;
    avatar_path?: string;
}
