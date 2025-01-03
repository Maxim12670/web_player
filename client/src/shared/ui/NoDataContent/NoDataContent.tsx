import noDataImage from "@shared/assets/image/no-data.png";
import styles from "./NoDataContent.module.scss";

interface INoDataContent {
  title?: string;
}

const NoDataContent = ({ title }: INoDataContent) => {
  return (
    <div className={styles.content}>
      <img src={noDataImage} alt="NoDataContent" />
      {title && <h2 className={styles.content__title}>{title}</h2>}
    </div>
  );
};

export default NoDataContent;
