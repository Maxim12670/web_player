import { useState } from "react";
import { useAppSelector } from "@app/store/hooks";
import { addTrackFavorite, deleteTrackFavorite } from "@entities/track/api/trackApi";

const useTrackToFavorite = () => {
  const [error, setError] = useState<string | null>(null);
  const user = useAppSelector((state) => state.user);

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

  return { handleClickTrackToFavorite, error };
};

export default useTrackToFavorite;
