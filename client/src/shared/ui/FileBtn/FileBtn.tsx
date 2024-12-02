import styles from "./FileBtn.module.scss";

interface IFileBtn {
  label: string;
  style?: string;
}

const FileBtn = ({ label, style }: IFileBtn) => {
  return (
    <div className={`${styles.container} ${style}`}>
      <input type="file" id="file" className={styles.input} />
      <label htmlFor="file" className={styles.label}>
        {label}
      </label>
    </div>
  );
};

export default FileBtn;
