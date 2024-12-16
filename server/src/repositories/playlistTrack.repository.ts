import pool from "../config";
import IPlaylistTrack from "../models/playlistTrack.model";

export class PlaylistTrackRepository {
  static async findTrack(playlistId: number, trackId: number) {
    const result = await pool.query(
      "SELECT * FROM playlist_track WHERE playlist_id = $1 AND track_id = $2",
      [playlistId, trackId]
    );

    return result.rows[0] ?? null;
  }

  static async addTrackPlaylist(playlistId: number, trackId: number) {
    const result = await pool.query("INSERT INTO playlist_track (playlist_id, track_id) VALUES ($1, $2) RETURNING *", [
      playlistId,
      trackId,
    ]);

    return result.rows[0];
  }

  static async deleteTrackPlaylist(playlistId: number, trackId: number) {
    const result = await pool.query("DELETE FROM playlist_track WHERE playlist_id = $1 AND track_id = $2", [
      playlistId,
      trackId,
    ]);

    return result;
  }

  static async getAllTrackPlaylist(playlistId: number) {
    const result = await pool.query("SELECT * FROM playlist_track WHERE playlist_id = $1", [playlistId]);

    return result.rows;
  }
}
