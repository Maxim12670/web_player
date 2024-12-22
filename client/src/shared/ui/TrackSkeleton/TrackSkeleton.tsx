import styles from "./TrackSkeleton.module.scss";
import { Children, ReactNode } from "react";
import { Avatar } from "@shared/ui";
import { ITrack } from "@entities/track/model/track";

interface ITrackSkeleton {
  children: ReactNode;
  style: string;
  track: ITrack;
}

const TrackSkeleton = ({ children, style, track }: ITrackSkeleton) => {
  const childrenArray = Children.toArray(children);

  return (
    <div className={`${styles["track"]} ${style}`}>
      {childrenArray[0]}
      <Avatar style={styles["track__avatar"]} avatar_path={track.logo_path} />
      <div className={styles["track__container"]}>
        <span className={styles["track__name"]}>{track.name}</span>
        <span className={styles["track__author"]}>{track.author}</span>
      </div>
      <div className={styles["track__btns"]}>{childrenArray[1]}</div>
    </div>
  );
};

export default TrackSkeleton;
