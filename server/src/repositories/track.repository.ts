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
      "INSERT INTO track (name, author, genre, duration, logo_path, track_path) VALUES ($1, $2, $3, $4, $5, $6) RETURNING track_id",
      [track.name, track.author, track.genre, track.duration, track.logo_path, track.track_path]
    );

    return result;
  }

  static async getTrackById(id: number): Promise<ITrack | null> {
    const track = await pool.query("SELECT * FROM track WHERE track_id = $1", [id]);
    return track.rows[0] ?? null;
  }

  static async getTrackByString(stringSearch: string): Promise<ITrack[] | null> {
    const tracks = await pool.query("SELECT * FROM track WHERE name ILIKE $1 OR author ILIKE $1", [`%${stringSearch}%`]);
    return tracks.rows.length > 0 ? tracks.rows : null;
  }
}
