import { Play, Pause } from "@shared/assets/icons/index";
import { useState } from "react";

interface IPlayBtn {
  playing: boolean;
  style?: string;
  onClick: () => void;
}

const PlayBtn = ({ playing, onClick, style }: IPlayBtn) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleClick = () => {
    setIsActive(!isActive)
    onClick();
  }
  return (
    <>
      {!playing ? (
        <Play className={style} onClick={handleClick} />
      ) : (
        <Pause className={style} onClick={handleClick} />
      )}
    </>
  );
};

export default PlayBtn;
