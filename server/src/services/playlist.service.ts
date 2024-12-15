import IPlaylist from "../models/playlist.model";
import { PlaylistRepository } from "../repositories/playlist.repository";
import { UserRepository } from "../repositories/user.repository";

export class PlaylistService {
  static async createPlaylist(playlist: IPlaylist) {
    const result = await PlaylistRepository.createPlaylist(playlist);

    return result;
  }

  static async deleteSelectPlaylist(personId: number, playlistId: number) {
    const user = await UserRepository.getInfo(personId);
    const playlist = await PlaylistRepository.findPlaylist(playlistId);

    if (!user) throw new Error("Пользователь не существует!");
    if (!playlist) throw new Error("Плейлист не найден!");

    const result = await PlaylistRepository.deleteSelectPlaylist(personId, playlistId);

    return result;
  }

  static async getUserSelectPlaylist(personId: number, playlistId: number) {
    const user = await UserRepository.getInfo(personId);
    const playlist = await PlaylistRepository.findPlaylist(playlistId);

    if (!user) throw new Error("Пользователь не существует!");
    if (!playlist) throw new Error("Плейлист не найден!");

    const result = await PlaylistRepository.getUserSelectPlaylist(personId, playlistId);

    if (!result) throw new Error("Что-то пошло не так...");

    return result;
  }

  static async getUserAllPlaylists(personId: number) {
    const user = await UserRepository.getInfo(personId);

    if (!user) throw new Error("Пользователь не существует!");

    const result = await PlaylistRepository.getUserAllPlaylists(personId);

    if (!result) throw new Error("Что-то пошло не так...");

    return result;
  }
}
