import ITrack from "../models/track.model";
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

    if (!favoriteTracks) throw new Error("Нет данных!");

    const tracks = await Promise.all(
      favoriteTracks.map(async (favoriteTrack: ITrack) => {
        const track = await TrackRepository.getTrackById(favoriteTrack.track_id!);
        return {
          ...track,
        };
      })
    );

    return tracks;
  }

  static async getTrackByString(personId: number, searchString: string) {
    const favoriteTrack = await FavoriteTrackRepository.getTrackByString(personId, searchString);

    if (!favoriteTrack) throw new Error("Нет данных!");

    return favoriteTrack;
  }
}
