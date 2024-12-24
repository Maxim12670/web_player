import { useAppDispatch, useAppSelector } from "@app/store/hooks";
import { selectedTrack, toggleStart } from "@app/store/storeSlices/currentTrackSlice";
import { convertBackslashesToSlashes } from "@shared/helper";
import { ITrack } from "@entities/track/model/track";

const useStartTrack = () => {
  const currentTrack = useAppSelector((state) => state.currentTrack);
  const dispatch = useAppDispatch();

  const handleTogglePlay = (track: ITrack) => {
    if (track.track_id !== currentTrack.track_id) {
      dispatch(selectedTrack({
        ...track,
        track_path: convertBackslashesToSlashes(`http://localhost:3001${track.track_path}`)
      }));
    } else {
      dispatch(toggleStart());
    }
  };

  return { handleTogglePlay };
};

export default useStartTrack;
