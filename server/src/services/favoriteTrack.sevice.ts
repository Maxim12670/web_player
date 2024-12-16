import { FavoriteTrackRepository } from "../repositories/favoriteTrack.repository";
import { TrackRepository } from "../repositories/track.repository";

export class FavoriteTrackService {
  static async addTrack(personId: number, trackId: number) {
    const track = await TrackRepository.getTrackById(trackId);

    if (!track) throw new Error("Трек не найден!");

    const result = await FavoriteTrackRepository.addTrack(personId, trackId);

    return result;
  }

  static async deleteTrack(personId: number, trackId: number) {
    const track = await TrackRepository.getTrackById(trackId);

    if (!track) throw new Error("Трек не найден!");

    const trackExist = await FavoriteTrackRepository.findTrack(personId, trackId);

    if (!trackExist) throw new Error("Что то пошло не так...");
    
    const result = await FavoriteTrackRepository.deleteTrack(personId, trackId);

    return result;
  }

  static async getAllTrack(personId: number) {
    const favoriteTracks = await FavoriteTrackRepository.getAllTrack(personId);

    const tracks = await Promise.all(
      favoriteTracks.map(async (favoriteTrack: any) => {
        const track = await TrackRepository.getTrackById(favoriteTrack.track_id);
        return {
          ...favoriteTrack,
          track,
        };
      })
    );

    return tracks;
  }
}
