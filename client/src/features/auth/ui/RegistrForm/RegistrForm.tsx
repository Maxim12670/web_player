import styles from "./RegistrForm.module.scss";
import { MyButton, MyInput } from "../../../../shared/ui";
import { MyInputType } from "../../../../shared/types/enums";
import { useRegistr } from "../../model/useRegistr";
import React, { useState, useEffect } from "react";

const RegistrForm = () => {
    const { handleRegistr, error } = useRegistr();
    const [email, setEmail] = useState<string>("");
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [disabledBtn, setDisabletBtn] = useState<boolean>(true);

    const onSubmit = () => {
        event?.preventDefault();
        handleRegistr({ email, login, password });
    };

    useEffect(() => {
        if ([email, login, password].every((field) => field !== "")) setDisabletBtn(false);
    }, [email, login, password]);

    return (
        <div className={styles["login-form"]}>
            <span className={styles["login-form__title"]}>Registration</span>
            <MyInput
                type={MyInputType.Text}
                title="Email"
                placeholder="Email"
                style={styles.input}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />
            <MyInput
                type={MyInputType.Text}
                title="Login"
                placeholder="Login"
                style={styles.input}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLogin(e.target.value)}
            />
            <MyInput
                type={MyInputType.Password}
                title="Password"
                placeholder="Password"
                style={styles.input}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />
            {error ? <p>{error}</p> : ""}
            <MyButton text="Sign up" style={styles.button} disabled={disabledBtn} onClick={onSubmit} />
        </div>
    );
};

export default RegistrForm;
