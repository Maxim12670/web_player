import styles from "./AudioPlayer.module.scss";
import { ArrowPrev, ArrowNext, Play, Pause, Volume, Ellipsis } from "@shared/assets/icons";
import { ITrack } from "@entities/track/model/track";
import { useEffect, useRef, useState } from "react";
import { converToMinAndSec } from "@shared/helper";
import { myAudio } from "./data";

const AudioPlayer = () => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [repeating, setRepeating] = useState<boolean>(false);
  const [selectedTrack, setSelectedTrack] = useState<ITrack | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<HTMLSpanElement | null>(null);

  const handleAudioPlay = () => {
    if (audioRef.current) {
      if (!playing) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      setPlaying(!playing);
    }
  };

  const handleTrackClick = (track: ITrack) => {
    setSelectedTrack(track);
    setPlaying(true);
    if (selectedTrack && audioRef.current) {
      console.log(1);
      audioRef.current.src = selectedTrack.track_path;
      audioRef.current.play();
      setPlaying(true);
    }
  };

  const handlePauseClick = () => {
    if (playing && audioRef.current) {
      setPlaying(false);
      audioRef.current.pause();
    }
  };

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
  }, [repeating, selectedTrack]);

  // useEffect(() => {
  //   if (selectedTrack && audioRef.current) {
  //     console.log(1)
  //     audioRef.current.src = selectedTrack.track_path;
  //     audioRef.current.play();
  //     setPlaying(true);
  //   }
  // }, [selectedTrack]);

  return (
    <div className={styles.player}>
      <div className={styles.track}>
        <img
          src="http://localhost:3001\cloud\image\one love_1_avatar.jpg"
          alt="track avatar"
          className={styles.track__avatar}
        />
        <div className={styles.track__wrapper}>
          <h2 className={styles.track__title}>name</h2>
          <h3 className={styles.track__subtitle}>author</h3>
          <h3 className={styles.track__subtitle}>current list</h3>
        </div>
      </div>

      <div className={styles.control}>
        <div className={styles.buttons}>
          <ArrowPrev className={`${styles.btn}`} />
          {!playing ? (
            <Play className={`${styles.btn}`} onClick={() => handleTrackClick(myAudio)} />
          ) : (
            <Pause className={`${styles.btn}`} onClick={() => handlePauseClick()} />
          )}

          <ArrowNext className={`${styles.btn}`} />
        </div>

        <div className={styles.progress}>
          <span className={`${styles["progress__time"]}`} ref={timelineRef}>
            00:00
          </span>
          <div className={styles["progress__line"]}>
            <span ref={progressRef}></span>
          </div>
          <span className={`${styles["progress__time"]}`}>{myAudio.duration}</span>
        </div>
      </div>

      {audioRef != null ? <audio ref={audioRef} /> : ""}

      <div className={styles.options}>
        <Volume className={`${styles.btn} ${styles.options__volume}`} />
        <Ellipsis className={`${styles.btn} ${styles.options__ellipsis}`} />
      </div>
    </div>
  );
};

export default AudioPlayer;
