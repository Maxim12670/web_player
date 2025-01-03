import styles from "./AllTracksPage.module.scss";
import { MyInput, NoDataContent } from "@shared/ui";
import { MyInputType } from "@shared/types/enums";
import { TrackItem } from "@widgets/ui";
import { useLoaderData } from "react-router-dom";
import { ITrack } from "@entities/track/model/track";
import { useEffect, useState } from "react";
import { getTracksByString } from "@entities/track/api/trackApi";
import { usePlaylist } from "@features/playlist/model/usePlaylist";
import { IPlaylist } from "@entities/playlist/model/playlist";

const AllTracksPage = () => {
  const loaderData = useLoaderData() as ITrack[];
  const [tracks, setTracks] = useState<ITrack[]>([]);
  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);
  const [searchString, setSearchString] = useState<string | null>(null);
  const { getAllPlaylist } = usePlaylist();

  const handleKeyPress = async (e: any) => {
    if (e.key === "Enter") {
      setSearchString(e.target.value);
      const searchTracks = await getTracksByString(e.target.value);
      setTracks(searchTracks);
    }
  };

  useEffect(() => {
    if (loaderData) {
      setTracks(loaderData);
    }
  }, []);

  useEffect(() => {
    const fetchPlaylists = async () => {
      const data = await getAllPlaylist();
      setPlaylists(data as IPlaylist[]);
    };

    fetchPlaylists();
  }, []);

  return (
    <div className={styles["tracks"]}>
      <MyInput type={MyInputType.Text} placeholder="Search music" onKeyPress={(e: any) => handleKeyPress(e)} />
      <div>
        {tracks.length != 0 ? (
          tracks.map((track: ITrack) => (
            <TrackItem style={styles["tracks__item"]} track={track} playlists={playlists} />
          ))
        ) : (
          <NoDataContent title="Нет данных!!!" />
        )}
      </div>
    </div>
  );
};

export default AllTracksPage;
