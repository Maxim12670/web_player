import { useState } from "react";
import { ILoginUser, loginUser } from "@entities/user/api/authUserApi";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "@app/router/router";

export const useLogin = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async ({ email, password }: ILoginUser) => {
        setLoading(true);
        setError(null);

        try {
            const data = await loginUser({ email, password });
            console.log("handle login data: ", data);
            if (data) {
                localStorage.setItem("userId", String(data));
                navigate(RoutePaths.main);
            }
        } catch (err) {
            if (err instanceof Error) setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { handleLogin, loading, error };
};
