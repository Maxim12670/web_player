import { ChangeEvent } from "react";
import styles from "./FileBtn.module.scss";

interface IFileBtn {
  label: string;
  style?: string;
  id: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FileBtn = ({ label, style, id, onChange }: IFileBtn) => {
  return (
    <div className={`${styles.container} ${style}`}>
      <input type="file" id={id} className={styles.input} onChange={onChange} />
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
    </div>
  );
};

export default FileBtn;
