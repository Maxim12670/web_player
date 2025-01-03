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
  const [currentPlaylist, setCurrentPlaylist] = useState<IPlaylist | null>(null);
  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);

  const { getTracksPlaylist, getSelectedPlaylist, getAllPlaylist } = usePlaylist();

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const fetchTracks = await getTracksPlaylist(Number(playlistId));
        const fetchcurrentPlaylist = await getSelectedPlaylist(Number(playlistId));
        const fetchPlaylists = await getAllPlaylist();
        setTracks(fetchTracks as ITrack[]);
        setCurrentPlaylist(fetchcurrentPlaylist as IPlaylist);
        setPlaylists(fetchPlaylists as IPlaylist[]);
      } catch (err: any) {
        console.log("Error in playlist page: ", err.message);
      }
    };

    fetchTracks();
  }, [playlistId]);

  return (
    <div className={styles.playlist}>
      <div className={styles["playlist__container"]}>
        <Avatar avatarPath={currentPlaylist?.logo_path!} style={styles["playlist__avatar"]} />
        {currentPlaylist?.description && (
          <span className={styles["playlist__descr"]}>{currentPlaylist?.description}</span>
        )}
      </div>
      <div className={styles["playlist__tracks"]}>
        {tracks.length != 0 ? (
          tracks.map((track: ITrack) => (
            <TrackItem style={styles["track"]} track={{ ...track }} playlists={playlists} />
          ))
        ) : (
          <NoDataContent title="Плейлист пустой!" />
        )}
      </div>
    </div>
  );
};

export default PlaylistPage;
