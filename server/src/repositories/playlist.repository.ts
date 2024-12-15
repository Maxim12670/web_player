import pool from "../config";
import IPlaylist from "../models/playlist.model";

export class PlaylistRepository {
  static async findPlaylist(id: number) {
    const playlist = await pool.query("SELECT * FROM playlist WHERE playlist_id = $1", [id]);

    return playlist.rows[0] ?? null;
  }

  static async getCountPlaylist() {
    const count = await pool.query("SELECT * FROM playlist");
    if (count.rowCount == null) {
      return 1;
    }
    return count.rowCount + 1;
  }

  static async createPlaylist(playlist: IPlaylist) {
    const { title, description, logo_path, person_id } = playlist;
    const result = await pool.query(
      "INSERT INTO playlist (title, description, logo_path, person_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, description, logo_path, person_id]
    );

    return result.rows[0];
  }

  static async deleteSelectPlaylist(personId: number, playlistId: number) {
    const result = await pool.query("DELETE FROM playlist WHERE person_id = $1 AND playlist_id = $2", [
      personId,
      playlistId,
    ]);

    return result;
  }

  static async getUserSelectPlaylist(personId: number, playlistId: number) {
    const playlist = await pool.query("SELECT * FROM playlist WHERE person_id = $1 AND playlist_id = $2", [
      personId,
      playlistId,
    ]);

    return playlist.rows[0] ?? null;
  }

  static async getUserAllPlaylists(personId: number) {
    const playlist = await pool.query("SELECT * FROM playlist WHERE person_id = $1", [
      personId
    ]);

    return playlist.rows ?? null;
  }
}
