import styles from "./LoginPage.module.scss";
import { LoginForm, RegistrForm } from "@features/auth/ui";
import { ContentContainer, MyButton } from "@shared/ui";
import { useState } from "react";

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState<boolean>(false);

    const toggleIsLogin = (newValue: boolean) => {
        setIsLogin(newValue);
    };

    return (
        <ContentContainer>
            <>
                <div className={styles["button__wrapper"]}>
                    <MyButton text="Sing in" style={styles["button"]} onClick={() => toggleIsLogin(true)} />
                    <MyButton text="Sing up" style={styles["button"]} onClick={() => toggleIsLogin(false)} />
                </div>
                <div className={styles.container}>{isLogin ? <LoginForm /> : <RegistrForm />}</div>
            </>
        </ContentContainer>
    );
};

export default LoginPage;
