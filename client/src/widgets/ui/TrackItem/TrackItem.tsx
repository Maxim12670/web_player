import styles from "./TrackItem.module.scss";
import { TrackSkeleton, FavoriteBtn, PlayBtn } from "@shared/ui";
import { Ellipsis } from "@shared/assets/icons";
import { useState } from "react";
import { ITrack } from "@entities/track/model/track";
import { useTrackToFavorite } from "@features/track/model";

interface ITrackItem {
  style: string;
  track: ITrack;
}

// сделать функцию в аллтракпейдж которую будем передавать сюда
// будет пушить айди треков

const TrackItem = ({ style, track }: ITrackItem) => {
  const [addedTrack, setAddTrack] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(false);
  const { handleClickTrackToFavorite } = useTrackToFavorite();

  const handleClickPlay = () => {
    setPlaying(!playing);
  };

  const handleClickFavorite = () => {
    setAddTrack(!addedTrack);
    handleClickTrackToFavorite(track.track_id!, addedTrack);
  };

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
