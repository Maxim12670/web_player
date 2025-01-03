import styles from "./Avatar.module.scss";
import noPhoto from "@shared/assets/image/no-photo.png";

interface IAvatar {
  style?: string;
  avatarPath: string | null;
}

const Avatar = ({ style, avatarPath }: IAvatar) => {
  return (
    <img
      src={avatarPath ? `http://localhost:3001${avatarPath}` : noPhoto}
      alt="avatar"
      className={`${styles["avatar"]} ${style}`}
    />
  );
};

export default Avatar;
