import IPlaylistTrack from "../models/playlistTrack.model";
import { PlaylistTrackRepository } from "../repositories/playlistTrack.repository";
import { TrackRepository } from "../repositories/track.repository";
import { PlaylistRepository } from "../repositories/playlist.repository";

export class PlaylistTrackService {
  static async addTrackPlaylist(playlistId: number, trackId: number) {
    const playlist = await PlaylistRepository.findPlaylist(playlistId);
    const track = await TrackRepository.getTrackById(trackId);

    if (!playlist) throw new Error("Плейлист не найден!");
    if (!track) throw new Error("Трек не найден!");

    const result = await PlaylistTrackRepository.addTrackPlaylist(playlistId, trackId);

    return result;
  }

  static async deleteTrackPlaylist(playlistId: number, trackId: number) {
    const playlist = await PlaylistRepository.findPlaylist(playlistId);
    const track = await TrackRepository.getTrackById(trackId);

    if (!playlist) throw new Error("Плейлист не найден!");
    if (!track) throw new Error("Трек не найден!");

    const result = await PlaylistTrackRepository.deleteTrackPlaylist(playlistId, trackId);

    return result;
  }

  static async getAllTrackPlaylist(playlistId: number) {
    const playlist = await PlaylistRepository.findPlaylist(playlistId);
    
    if (!playlist) throw new Error("Плейлист не найден!");

    const playlistTracks  = await PlaylistTrackRepository.getAllTrackPlaylist(playlistId);

    const tracks = await Promise.all(
      playlistTracks.map(async (playlistTrack: any) => {
        const track = await TrackRepository.getTrackById(playlistTrack.track_id);
        return {
          ...playlistTrack,
          track,
        };
      })
    );

    return tracks;
  }
}
