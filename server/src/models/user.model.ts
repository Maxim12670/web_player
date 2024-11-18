export default interface IUser {
    person_id: number;
    login: string;
    email: string;
    password: string;
    avatar_path?: string;
}
