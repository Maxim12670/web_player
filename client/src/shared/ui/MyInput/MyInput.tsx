import styles from "./MyInput.module.scss";
import { MyInputType } from "../../types/enums";
import React from "react";

interface IMyInput {
    type: MyInputType;
    title?: string;
    placeholder?: string;
    style?: string;
    required?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MyInput = ({ type, title, placeholder, style, required, onChange }: IMyInput) => {
    return (
        <div className={`${styles["my-input"]} ${style}`}>
            <span className={styles["my-input__title"]}>{title}</span>
            <input
                className={styles["my-input__input"]}
                type={type}
                required={required}
                placeholder={placeholder}
                onChange={onChange}
            />
        </div>
    );
};

export default MyInput;
