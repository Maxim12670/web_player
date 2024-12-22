import styles from "./AllTracksPage.module.scss";
import { MyInput } from "@shared/ui";
import { MyInputType } from "@shared/types/enums";
import {TrackItem} from "@widgets/ui";
import { useLoaderData } from "react-router-dom";
import { ITrack } from "@entities/track/model/track";
import { useEffect, useState } from "react";
import { getTracksByString } from "@entities/track/api/trackApi";

const AllTracksPage = () => {
  const loaderData = useLoaderData() as ITrack[];
  const [tracks, setTracks] = useState<ITrack[]>([]);
  const [searchString, setSearchString] = useState<string | null>(null);

  const handleKeyPress = async (e: any) => {
    if (e.key === "Enter") {
      console.log("Нажата клавиша Enter!");
      console.log("Text: ", e.target.value);
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

  return (
    <div className={styles["tracks"]}>
      <MyInput type={MyInputType.Text} placeholder="Search music" onKeyPress={(e: any) => handleKeyPress(e)} />
      <div>
        {tracks.length != 0 ? (
          tracks.map((track: ITrack) => <TrackItem style={styles["tracks__item"]} track={track} />)
        ) : (
          <h2>НЕТ ДАННЫХ!</h2>
        )}
      </div>
    </div>
  );
};

export default AllTracksPage;
