import styles from "./AudioPlayer.module.scss";
import ArrowPrev from "@shared/assets/icons/arrow-prev.svg?react";
import ArrowNext from "@shared/assets/icons/arrow-next.svg?react";
import Play from "@shared/assets/icons/play-default.svg?react";

const AudioPlayer = () => {
  return (
    <div className={styles["audio-player"]}>
      <ArrowPrev className={`${styles.btn}`} />
      <ArrowNext className={`${styles.btn}`} />
      <Play className={`${styles.btn}`}/>
    </div>
  );
};

export default AudioPlayer;
