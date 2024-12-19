import styles from "./MyInput.module.scss";
import { MyInputType } from "../../types/enums";
import { ChangeEvent } from "react";

interface IMyInput {
  type: MyInputType;
  title?: string;
  placeholder?: string;
  value?: any; 
  style?: string;
  required?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const MyInput = ({ type, title, placeholder, style, required, value, onChange }: IMyInput) => {
  return (
    <div className={`${styles["my-input"]} ${style}`}>
      <span className={styles["my-input__title"]}>{title}</span>
      <input
        className={styles["my-input__input"]}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default MyInput;
