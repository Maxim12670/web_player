import styles from "./FavoriteTracksPage.module.scss";
import { MyInput, NoDataContent } from "@shared/ui";
import { MyInputType } from "@shared/types/enums";
import { TrackItem } from "@widgets/ui";
import { useLoaderData } from "react-router-dom";
import { ITrack } from "@entities/track/model/track";
import { useEffect, useState } from "react";
import { useFavoriteTrack } from "@features/track/model";

const FavoriteTracksPage = () => {
  const loaderData = useLoaderData() as ITrack[];
  const [tracks, setTracks] = useState<ITrack[]>([]);
  const [searchString, setSearchString] = useState<string | null>(null);
  const { getFavoritesTracksByString } = useFavoriteTrack();

  const handleKeyPress = async (e: any) => {
    if (e.key === "Enter") {
      console.log("Нажата клавиша Enter!");
      console.log("Text: ", e.target.value);
      setSearchString(e.target.value);
      const searchTracks = await getFavoritesTracksByString(e.target.value);
      if (!searchTracks) setTracks([]);
      else setTracks(searchTracks);
    }
  };

  useEffect(() => {
    if (loaderData) {
      setTracks(loaderData);
    } else setTracks([]);
  }, []);

  return (
    <div className={styles["tracks"]}>
      <MyInput type={MyInputType.Text} placeholder="Search music" onKeyPress={(e: any) => handleKeyPress(e)} />
      <div>
        {tracks.length != 0 ? (
          tracks.map((track: ITrack) => (
            <TrackItem style={styles["tracks__item"]} track={{ ...track, isFavorite: true }} />
          ))
        ) : (
          <NoDataContent title="Нет данных!!!" />
        )}
      </div>
    </div>
  );
};

export default FavoriteTracksPage;
