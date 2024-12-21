import styles from "./TrackSkeleton.module.scss";
import { ReactElement, ReactNode, useState } from "react";
import { PlayBtn } from "@shared/ui";
import { ITrack } from "@entities/track/model/track";

interface ITrackSkeleton {
  children: ReactElement | ReactNode;
  style: string;
  track: ITrack;
}

// добить потом сравнение с карент, если совпало то будет актив!!!
const TrackSkeleton = ({ children, style, track }: ITrackSkeleton) => {
  const [playing, setPlaying] = useState<boolean>(false);

  const handleClick = () => {
    setPlaying(!playing);
  };
  return (
    <div className={`${styles["track"]} ${style}`}>
      <PlayBtn playing={playing} onClick={handleClick} style={styles["track__play-btn"]} />
      <img src={`http://localhost:3001${track.logo_path}`} alt="avatar track" className={styles["track__avatar"]} />
      <div className={styles["track__container"]}>
        <span className={styles["track__name"]}>{track.name}</span>
        <span className={styles["track__author"]}>{track.author}</span>
      </div>

      <div className={styles["track__btns"]}>{children}</div>
    </div>
  );
};

export default TrackSkeleton;
