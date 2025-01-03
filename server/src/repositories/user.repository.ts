import pool from "../config";
import IUser from "../models/user.model";

export class UserRepository {
  static async createUser(email: string, login: string, password: string): Promise<IUser | null> {
    const result = await pool.query("INSERT INTO person (email, login, password) VALUES ($1, $2, $3) RETURNING *", [
      email,
      login,
      password,
    ]);

    return result.rows.length ? result.rows[0] : null;
  }

  static async getInfo(id: number) {
    const result = await pool.query("SELECT * FROM person WHERE person_id = $1", [id]);

    return result.rows.length ? result.rows[0] : null;
  }

  static async findEmail(email: string): Promise<IUser | null> {
    const result = await pool.query("SELECT * FROM person WHERE email = $1", [email]);

    return result.rows.length ? result.rows[0] : null;
  }
}
