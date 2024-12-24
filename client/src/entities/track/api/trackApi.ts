// методы отправки, получения и тд
import axiosInstance from "@shared/api/axiosInstace";
import { ITrack } from "../model/track";

class ApiTrack {
  static postNewTrack = "track/new-track";
  static getAllTracks = "track/all-tracks";
  static generalSearch = "track/get-by-string";
  static getAllFavoriteTracks = "favorite-track/all-track";
  static getFavoriteTracksByString = "favorite-track/get-by-string";
  static addFavoriteTrack = "favorite-track/add";
  static deleteFavoriteTrack = "favorite-track/delete";
}

export const postNewTrack = async (formData: FormData): Promise<void> => {
  await axiosInstance.post<ITrack>(ApiTrack.postNewTrack, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getAllTracks = async () => {
  const tracks = await axiosInstance.get(ApiTrack.getAllTracks);

  return tracks.data as ITrack[];
};

export const getTracksByString = async (searchString: string): Promise<ITrack[]> => {
  try {
    const response = await axiosInstance.get(ApiTrack.generalSearch, {
      params: {
        searchString,
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
export const getFavoriteTracks = async (personId: number) => {
  const response = await axiosInstance.post(ApiTrack.getAllFavoriteTracks, {
    personId,
  });

  return response.data as ITrack[];
};

export const getFavoriteTracksByString = async (personId: number, searchString: string) => {
  const response = await axiosInstance.post(ApiTrack.getFavoriteTracksByString, {
    personId,
    searchString,
  });

  return response.data as ITrack[];
};

export const addTrackFavorite = async (personId: number, trackId: number) => {
  const response = await axiosInstance.post(ApiTrack.addFavoriteTrack, {
    personId,
    trackId,
  });

  return response.data;
};

export const deleteTrackFavorite = async (personId: number, trackId: number) => {
  const response = await axiosInstance.post(ApiTrack.deleteFavoriteTrack, {
    personId,
    trackId,
  });

  return response.data;
};
