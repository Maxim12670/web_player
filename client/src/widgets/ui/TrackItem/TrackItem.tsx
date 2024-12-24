import styles from "./TrackItem.module.scss";
import { TrackSkeleton, FavoriteBtn, PlayBtn } from "@shared/ui";
import { Ellipsis } from "@shared/assets/icons";
import { useEffect, useState } from "react";
import { ITrack } from "@entities/track/model/track";
import { useTrackToFavorite, useStartTrack } from "@features/track/model";
import { useAppSelector } from "@app/store/hooks";

interface ITrackItem {
  style: string;
  track: ITrack;
}

const TrackItem = ({ style, track }: ITrackItem) => {
  const [addedTrack, setAddTrack] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(false);
  const currentTrack = useAppSelector((state) => state.currentTrack);
  const { handleClickTrackToFavorite } = useTrackToFavorite();
  const { handleTogglePlay } = useStartTrack();

  const handleClickPlay = () => {
    handleTogglePlay(track);
  };

  const handleClickFavorite = () => {
    setAddTrack(!addedTrack);
    handleClickTrackToFavorite(track.track_id!, addedTrack);
  };

  useEffect(() => {
    if (track.track_id === currentTrack.track_id) {
      setPlaying(currentTrack.isActive!);
    } else {
      setPlaying(false);
    }
  }, [currentTrack]);

  return (
    <TrackSkeleton style={style} track={track}>
      <PlayBtn playing={playing} onClick={handleClickPlay} style={styles["btn__play"]} />
      <>
        <FavoriteBtn style={styles.btn} handleClick={handleClickFavorite} addedTrack={addedTrack} />
        <Ellipsis className={styles.btn} />
      </>
    </TrackSkeleton>
  );
};

export default TrackItem;
