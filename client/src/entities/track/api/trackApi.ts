// методы отправки, получения и тд
import axiosInstance from "@shared/api/axiosInstace";
import { ITrack } from "../model/track";

class ApiTrack {
  static postNewTrack = "track/new-track";
  static getAll = "track/all-tracks";
  static generalSearch = "track/get-tracks-by-string";
  static addTrackFavorite = "favorite-track/add";
  static deleteTrackFavorite = "favorite-track/delete";
}

export const postNewTrack = async (formData: FormData): Promise<void> => {
  await axiosInstance.post<ITrack>(ApiTrack.postNewTrack, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getAllTracks = async () => {
  const tracks = await axiosInstance.get(ApiTrack.getAll);

  return tracks.data as ITrack[];
};

export const getTracksByString = async (stringSearch: string): Promise<ITrack[]> => {
  try {
    const response = await axiosInstance.get(ApiTrack.generalSearch, {
      params: {
        stringSearch: stringSearch,
      },
    });

    return response.data as ITrack[];
  } catch (error) {
    console.log("Произошла ошибка: ", error);
    return [];
  }
};

// getFavoriteTracks
// getFavoriteTracksByString

export const addTrackFavorite = async (personId: number, trackId: number) => {
  const response = await axiosInstance.post(ApiTrack.addTrackFavorite, {
    personId,
    trackId,
  });

  return response.data;
};

export const deleteTrackFavorite = async (personId: number, trackId: number) => {
  const response = await axiosInstance.post(ApiTrack.deleteTrackFavorite, {
    personId,
    trackId,
  });

  return response.data;
};
