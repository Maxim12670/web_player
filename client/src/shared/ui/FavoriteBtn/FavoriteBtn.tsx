import styles from "./FavoriteBtn.module.scss";
import { CheckMark, CrossMark } from "@shared/assets/icons";

interface IFavoriteBtn {
  style?: string;
  addedTrack: boolean;
  handleClick: () => void;
}

const FavoriteBtn = ({ style, addedTrack, handleClick }: IFavoriteBtn) => {
  return (
    <>
      {!addedTrack ? (
        <CheckMark className={`${style}`} onClick={handleClick} />
      ) : (
        <CrossMark className={`${style}`} onClick={handleClick} />
      )}
    </>
  );
};

export default FavoriteBtn;
