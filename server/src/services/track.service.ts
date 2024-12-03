import { TrackRepository } from "../repositories/track.repository";
import ITrack from "../models/track.model";

export class TrackService {
  static async addNewTrack(track: ITrack) {
    const result = TrackRepository.addNewTrack(track);
    if (!result) {
      throw new Error("Ошибка при загрузке трека!");
    }
  }
}
