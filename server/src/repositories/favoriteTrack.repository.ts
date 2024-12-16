import pool from "../config";

export class FavoriteTrackRepository {
  static async findTrack(personId: number, trackId: number) {
    const result = await pool.query(
      "SELECT * FROM person_favorite_track WHERE person_id = $1 AND track_id = $2",
      [personId, trackId]
    );

    return result.rows[0] ?? null;
  }

  static async addTrack(personId: number, trackId: number) {
    const result = await pool.query(
      "INSERT INTO person_favorite_track (person_id, track_id) VALUES ($1, $2) RETURNING *",
      [personId, trackId]
    );

    return result.rows[0];
  }

  static async deleteTrack(personId: number, trackId: number) {
    const result = await pool.query("DELETE FROM person_favorite_track WHERE person_id = $1 AND track_id = $2", [
      personId,
      trackId,
    ]);

    return result.rows;
  }

  static async getAllTrack(personId: number) {
    const result = await pool.query("SELECT * FROM person_favorite_track WHERE person_id = $1", [personId]);

    return result.rows;
  }
}
