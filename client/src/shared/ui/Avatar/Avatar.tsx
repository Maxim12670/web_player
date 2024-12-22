import styles from "./Avatar.module.scss";
import noPhoto from "@shared/assets/image/no-photo.png";

interface IAvatar {
  style?: string;
  avatar_path: string | null;
}

const Avatar = ({ style, avatar_path }: IAvatar) => {
  return (
    <img
      src={avatar_path ? `http://localhost:3001${avatar_path}` : noPhoto}
      alt="avatar"
      className={`${styles["avatar"]} ${style}`}
    />
  );
};

export default Avatar;
