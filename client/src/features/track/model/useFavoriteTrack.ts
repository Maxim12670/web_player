import { useState } from "react";
import { useAppSelector } from "@app/store/hooks";
import {
  requestAllFavoritesTracks,
  requestFavoritesTracksByString,
  addTrackFavorite,
  deleteTrackFavorite,
} from "@entities/track/api/trackApi";
import { ITrack } from "@entities/track/model/track";

const useFavoriteTrack = () => {
  const [error, setError] = useState<string | null>(null);
  const user = useAppSelector((state) => state.user);

  const getAllFavoritesTracks = async (personId: number) => {
    try {
      const tracks = await requestAllFavoritesTracks(personId);

      if (tracks) return tracks;
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    }
  };

  // получение по строке из избранных
  const getFavoritesTracksByString = async (searchString: string) => {
    try {
      const tracks = await requestFavoritesTracksByString(user.person_id!, searchString);

      if (tracks) return tracks as ITrack[];
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    }
  };

  const handleClickTrackToFavorite = async (trackId: number, isAdded: boolean) => {
    try {
      if (!isAdded) {
        await addTrackFavorite(user.person_id!, trackId);
      } else {
        // будет стор по трекам пользователя,
        // нужно будет добавить случай, чтобы при удалении, так же удалялся трек из списка стора
        await deleteTrackFavorite(user.person_id!, trackId);
      }
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    }
  };

  return { getAllFavoritesTracks, getFavoritesTracksByString, handleClickTrackToFavorite, error };
};

export default useFavoriteTrack;
