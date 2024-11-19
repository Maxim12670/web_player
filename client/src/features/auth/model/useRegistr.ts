import { useState } from "react";
import { IRegistrUsert, registrUser } from "@entities/user/api/authUserApi";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "@app/router/router";

export const useRegistr = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleRegistr = async ({ email, login, password }: IRegistrUsert) => {
        setLoading(true);
        setError(null);

        try {
            const data = await registrUser({ email, login, password });
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

    return { handleRegistr, loading, error };
};
