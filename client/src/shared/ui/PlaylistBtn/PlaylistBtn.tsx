import styles from "./PlaylistBtn.module.scss";
import { Ellipsis } from "@shared/assets/icons";
import { IPlaylist } from "@entities/playlist/model/playlist";
import { useParams } from "react-router-dom";
import { ITrack } from "@entities/track/model/track";
import { usePlaylist } from "@features/playlist/model/usePlaylist";

interface IPlaylistBtn {
  style?: string;
  track: ITrack;
  playlists: IPlaylist[];
}

const PlaylistBtn = ({ style, track, playlists }: IPlaylistBtn) => {
  const urlParams = useParams();
  const { addTrackPlaylist, deleteTrackPlaylist } = usePlaylist();

  const handleToggleTrackPlaylist = async (playlist: IPlaylist) => {
    if (Number(urlParams.playlistId) == playlist.playlist_id) {
      console.log("delete");
      await deleteTrackPlaylist(playlist.playlist_id!, track.track_id!);
    } else {
      console.log("add");
      await addTrackPlaylist(playlist.playlist_id!, track.track_id!);
    }
  };

  return (
    <div className="wrapper">
      <Ellipsis className={`${style} ${styles.playlist}`} />
      <ul className={`${styles.playlist__window}`}>
        {playlists &&
          playlists.map((playlist, i) => (
            <li
              key={i}
              className={`${styles.playlist__item} ${
                Number(urlParams.playlistId) == playlist.playlist_id! && styles["playlist__item-added"]
              }`}
              onClick={() => handleToggleTrackPlaylist(playlist)}
            >
              {playlist.title}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default PlaylistBtn;
