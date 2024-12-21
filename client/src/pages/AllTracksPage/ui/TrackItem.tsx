import styles from "./TrackItem.module.scss";
import { TrackSkeleton } from "@shared/ui";
import { CheckMark, CrossMark, Ellipsis } from "@shared/assets/icons";
import { useState } from "react";
import { ITrack } from "@entities/track/model/track";
import { useTrackToFavorite } from "@features/track/model/useTrackToFavorite";

interface ITrackItem {
  style: string;
  track: ITrack;
}

// сделать функцию в аллтракпейдж которую будем передавать сюда
// будет пушить айди треков

const TrackItem = ({ style, track }: ITrackItem) => {
  const [addedTrack, setAddTrack] = useState<boolean>(false);
  const { handleClickTrackToFavorite } = useTrackToFavorite();

  const handleClick = () => {
    setAddTrack(!addedTrack);
    handleClickTrackToFavorite(track.track_id!, addedTrack);
  };

  return (
    <TrackSkeleton style={style} track={track}>
      <>
        {!addedTrack ? (
          <CheckMark className={styles.btn} onClick={handleClick} />
        ) : (
          <CrossMark className={styles.btn} onClick={handleClick} />
        )}
      </>
      <Ellipsis className={styles.btn} />
    </TrackSkeleton>
  );
};

export default TrackItem;
