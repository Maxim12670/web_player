import pool from "../config";
import ITrack from "../models/track.model";

export class TrackRepository {
  static async getCountTrack() {
    const count = await pool.query("SELECT * FROM track");
    if (count.rowCount == null) {
      return 1;
    }
    return count.rowCount + 1;
  }

  static async addNewTrack(track: ITrack) {
    const result = await pool.query(
      "INSERT INTO track (name, author, genre, logo_path, track_path) VALUES ($1, $2, $3, $4, $5) RETURNING track_id",
      [track.name, track.author, track.genre, track.logo_path, track.track_path]
    );

    return result;
  }
}
