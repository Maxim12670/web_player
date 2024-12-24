import styles from "./AudioPlayer.module.scss";
import { PlayBtn, Avatar } from "@shared/ui";
import { ArrowPrev, ArrowNext, Volume, Ellipsis } from "@shared/assets/icons";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { converToMinAndSec } from "@shared/helper";
import { useStartTrack } from "@features/track/model";
import { useAppSelector } from "@app/store/hooks";

const AudioPlayer = () => {
  const [repeating, setRepeating] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.2);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<HTMLSpanElement | null>(null);
  const { handleTogglePlay } = useStartTrack();
  const currentTrack = useAppSelector((state) => state.currentTrack);

  const handleTrackClick = () => {
    if (currentTrack.isActive && audioRef.current) {
      handleTogglePlay(currentTrack);
      pauseTrack();
    } else if (currentTrack && audioRef.current) {
      handleTogglePlay(currentTrack);
      playTrack();
    }
  };

  const playTrack = () => {
    audioRef.current!.src = currentTrack.track_path!;
    audioRef.current!.volume = volume;
    audioRef.current!.play();
  };

  const pauseTrack = () => {
    audioRef.current!.pause();
  };

  const handleChangeVolume = (e: ChangeEvent<HTMLInputElement>) => {
    setVolume(+e.target.value);
    if (audioRef.current) {
      audioRef.current.volume = +e.target.value;
    }
  };

  useEffect(() => {
    if (currentTrack.isActive && audioRef.current) {
      playTrack();
    } else if (!currentTrack.isActive && audioRef.current) {
      pauseTrack();
    }
  }, [currentTrack.track_id, currentTrack.isActive]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateProgress = () => {
        if (audio) {
          const { currentTime } = audio;
          const duration = audio.duration;
          const width = (currentTime * 100) / duration;

          if (timelineRef.current) {
            timelineRef.current.innerHTML = converToMinAndSec(currentTime);
          }
          if (progressRef.current) {
            progressRef.current.style.width = `${width}%`;
          }
        }
      };

      const handleEnded = () => {
        if (audio) {
          audio.currentTime = 0;
          if (progressRef.current) {
            progressRef.current.style.width = "0%";
          }
          if (repeating) {
            audio.play();
          } else {
            // функция вызывающая следующий трек
            // handleNext();
          }
        }
      };

      audio.addEventListener("timeupdate", updateProgress);
      audio.addEventListener("ended", handleEnded);

      return () => {
        audio.removeEventListener("timeupdate", updateProgress);
        audio.removeEventListener("ended", handleEnded);
      };
    }
  }, [repeating, currentTrack]);

  return (
    <div className={styles.player}>
      <div className={styles.track}>
        <Avatar style={styles.track__avatar} avatar_path={currentTrack.logo_path} />
        <div className={styles.track__wrapper}>
          <h2 className={styles.track__title}>{currentTrack.name}</h2>
          <h3 className={styles.track__subtitle}>{currentTrack.author != "null" ? currentTrack.author : ""}</h3>
          <h3 className={styles.track__subtitle}>{currentTrack.genre != "null" ? currentTrack.genre : ""}</h3>
        </div>
      </div>

      <div className={styles.control}>
        <div className={styles.buttons}>
          <ArrowPrev className={`${styles.btn}`} />
          <PlayBtn style={styles.btn} playing={currentTrack.isActive!} onClick={handleTrackClick} />
          <ArrowNext className={`${styles.btn}`} />
        </div>

        <div className={styles.progress}>
          <span className={`${styles["progress__time"]}`} ref={timelineRef}>
            00:00
          </span>
          <div className={styles["progress__line"]}>
            <span ref={progressRef}></span>
          </div>
          <span className={`${styles["progress__time"]}`}>
            {currentTrack.duration != "" ? currentTrack.duration : "00:00"}
          </span>
        </div>
      </div>

      {audioRef != null ? <audio ref={audioRef} /> : ""}

      <div className={styles.options}>
        <div>
          <Volume className={`${styles.btn} ${styles["options__volume-icon"]}`} />
          <div className={styles["options__volume"]}>
            <input
              min="0"
              max="1"
              step="0.1"
              type="range"
              name="volume"
              value={volume}
              onChange={(e) => handleChangeVolume(e)}
            />
          </div>
        </div>
        <Ellipsis className={`${styles.btn} ${styles.options__ellipsis}`} />
      </div>
    </div>
  );
};

export default AudioPlayer;
