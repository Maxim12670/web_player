import styles from "./MyButton.module.scss";

interface IMyButton {
    text: string;
    style?: string;
    disabled?: boolean;
    onClick?: () => void;
}

const MyButton = ({ text, style, disabled, onClick }: IMyButton) => {
    return (
        <button type="button" className={`${styles.button} ${style}`} disabled={disabled} onClick={onClick}>
            {text}
        </button>
    );
};

export default MyButton;
