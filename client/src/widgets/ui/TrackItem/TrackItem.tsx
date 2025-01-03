import styles from "./TrackItem.module.scss";
import { TrackSkeleton, FavoriteBtn, PlayBtn, PlaylistBtn } from "@shared/ui";
import { useEffect, useState } from "react";
import { ITrack } from "@entities/track/model/track";
import { useFavoriteTrack, useStartTrack } from "@features/track/model";
import { useAppSelector } from "@app/store/hooks";
import { IPlaylist } from "@entities/playlist/model/playlist";

interface ITrackItem {
  style: string;
  track: ITrack;
  playlists: IPlaylist[];
}

const TrackItem = ({ style, track, playlists }: ITrackItem) => {
  const [addedTrack, setAddTrack] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(false);
  const currentTrack = useAppSelector((state) => state.currentTrack);
  const { handleClickTrackToFavorite } = useFavoriteTrack();
  const { handleTogglePlay } = useStartTrack();

  const handleClickPlay = () => {
    handleTogglePlay(track);
  };

  const handleClickFavorite = () => {
    setAddTrack(!addedTrack);
    handleClickTrackToFavorite(track.track_id!, addedTrack);
  };

  useEffect(() => {
    if (track.isFavorite != undefined) {
      setAddTrack(track.isFavorite);
    }
  }, []);

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
        <PlaylistBtn style={styles.btn} playlists={playlists} track={track}/>
      </>
    </TrackSkeleton>
  );
};

export default TrackItem;
