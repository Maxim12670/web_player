import { TrackRepository } from "../repositories/track.repository";
import ITrack from "../models/track.model";

export class TrackService {

  static async addNewTrack(track: ITrack) {
    const result = TrackRepository.addNewTrack(track);
    if (!result) {
      throw new Error("Ошибка при загрузке трека!");
    }
  }

  static async getAllTracks() {
    const tracks = await TrackRepository.getAllTracks();

    if (!tracks) throw new Error("Что-то пошло не так...");

    return tracks;
  }

  static async getTrackById(id: number) {
    const track = await TrackRepository.getTrackById(id);
    
    if (!track) throw new Error("Такого трека нет!");

    return track;
  }

  static async getTrackByString(stringSearch: string) {
    const tracks = await TrackRepository.getTrackByString(stringSearch);

    if (!tracks) throw new Error("Ничего не нашли!");

    return tracks;
  }
}
