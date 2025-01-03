import axiosInstance from "@shared/api/axiosInstace";
import { IPlaylist } from "../model/playlist";
import { ITrack } from "@entities/track/model/track";

class ApiPaths {
  static postNewPlaylist = "playlist/create-playlist";
  static getAllPlaylist = "playlist/all-playlists";
  static getSelectedPlaylist = "playlist/get-select-playlist";

  static addTrackPlaylist = "/playlist-track/add-track-playlist";
  static deleteTrackPlaylist = "/playlist-track/delete-track-playlist";
  static getPlaylistTracks = "/playlist-track/all-tracks-playlist";
}

export const postNewPlaylist = async (formData: FormData): Promise<void> => {
  await axiosInstance.post<IPlaylist>(ApiPaths.postNewPlaylist, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// получить плейлисты пользователя
export const requestAllPlaylist = async (personId: number) => {
  const result = await axiosInstance.post<IPlaylist[]>(ApiPaths.getAllPlaylist, {
    personId,
  });
  return result.data as IPlaylist[];
};

// получить треки плейлиста
export const requestTracksPlaylist = async (playlistId: number) => {
  const result = await axiosInstance.post<ITrack[]>(ApiPaths.getPlaylistTracks, {
    playlistId,
  });

  return result.data as ITrack[];
};

// получить плейлист пользователя
export const requestSelectedPlaylist = async (personId: number, playlistId: number) => {
  const result = await axiosInstance.post<IPlaylist>(ApiPaths.getSelectedPlaylist, {
    personId,
    playlistId,
  });

  return result.data as IPlaylist;
};

// добавить трек в плейлист
export const requestAddTrackPlaylist = async (playlistId: number, trackId: number) => {
  await axiosInstance.post(ApiPaths.addTrackPlaylist, {
    playlistId,
    trackId,
  });
};
// удалить трек с плейлиста
export const requestDeleteTrackPlaylist = async (playlistId: number, trackId: number) => {
  await axiosInstance.post(ApiPaths.deleteTrackPlaylist, {
    playlistId,
    trackId,
  });
};
