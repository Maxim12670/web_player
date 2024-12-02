import React, { useState } from "react";
import styles from "./MySelect.module.scss";

interface MySelectProps {
  selectValues: Array<string>;
  currentValue?: string | null;
  style?: string;
  onClick?: (value: string) => void;
}

const MySelect: React.FC<MySelectProps> = ({ selectValues, currentValue, style, onClick }) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleToggleActive = () => {
    setIsActive(!isActive);
  };

  const handleItemClick = (value: string) => {
    onClick(value);
    setIsActive(!isActive);
  };

  return (
    <div className={`${styles.dropdown} ${style}`}>
      <button
        className={`${styles["dropdown__button"]} ${isActive ? styles["dropdown__button-active"] : ""}`}
        onClick={handleToggleActive}
      >
        {currentValue ?? selectValues[0]}
      </button>
      <ul className={`${styles["dropdown__list"]} ${isActive ? styles["dropdown__list-active"] : ""}`}>
        {selectValues.map((item: string) => (
          <li key={item} className={styles["dropdown__list-item"]} onClick={() => handleItemClick(item)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MySelect;
