import { ITrack } from "@entities/track/model/track";
import styles from "./PlaylistPage.module.scss";
import { usePlaylist } from "@features/playlist/model/usePlaylist";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, NoDataContent } from "@shared/ui";
import { TrackItem } from "@widgets/ui";
import { IPlaylist } from "@entities/playlist/model/playlist";

const PlaylistPage = () => {
  const { playlistId } = useParams();
  const [tracks, setTracks] = useState<ITrack[]>([]);
  const [playlist, setPlaylist] = useState<IPlaylist | null>(null);

  const { getTracksPlaylist, getSelectedPlaylist } = usePlaylist();

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const fetchTracks = await getTracksPlaylist(Number(playlistId));
        const fetchPlaylist = await getSelectedPlaylist(Number(playlistId));
        setTracks(fetchTracks as ITrack[]);
        setPlaylist(fetchPlaylist as IPlaylist);
      } catch (err: any) {
        console.log("Error in playlist page: ", err.message);
      }
    };

    fetchTracks();
  }, [playlistId]);

  return (
    <div className={styles.playlist}>
      <div className={styles["playlist__container"]}>
        <Avatar avatarPath={playlist?.logo_path!} style={styles["playlist__avatar"]} />
        {playlist?.description && <span className={styles["playlist__descr"]}>{playlist?.description}</span>}
      </div>
      <div className={styles["playlist__tracks"]}>
        {tracks.length != 0 ? (
          tracks.map((track: ITrack) => <TrackItem style={styles["track"]} track={{ ...track }} />)
        ) : (
          <NoDataContent title="Плейлист пустой!" />
        )}
      </div>
    </div>
  );
};

export default PlaylistPage;
