import styles from "./LoginForm.module.scss";
import { MyButton, MyInput } from "@shared/ui";
import { MyInputType } from "@shared/types/enums";
import React, { useEffect, useState } from "react";
import { useLogin } from "../../model/useLogin";

const LoginForm = () => {
    const { handleLogin, error } = useLogin();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [disabledBtn, setDisabletBtn] = useState<boolean>(true);

    const onSubmit = () => {
        event?.preventDefault();
        handleLogin({ email, password });
    };

    useEffect(() => {
        if ([email, password].every((field) => field !== "")) setDisabletBtn(false);
    }, [email, password]);

    return (
        <div className={styles["login-form"]}>
            <span className={styles["login-form__title"]}>Authorize</span>
            <MyInput
                type={MyInputType.Text}
                title="Email"
                placeholder="Email"
                style={styles.input}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
            />
            <MyInput
                type={MyInputType.Password}
                title="Password"
                placeholder="Password"
                style={styles.input}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
            />
            {error ? <p>{error}</p> : ""}
            <MyButton text="Sing in" style={styles.button} disabled={disabledBtn} onClick={onSubmit} />
        </div>
    );
};

export default LoginForm;
