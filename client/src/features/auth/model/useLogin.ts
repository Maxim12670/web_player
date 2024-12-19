import { useState } from "react";
import { ILoginUser, loginUser } from "@entities/user/api/authUserApi";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "@app/router/router";
import { useAppDispatch } from "@app/store/hooks";
import { setInfo } from "@app/store/storeSlices/userSlice";
import { IUser } from "@entities/user/model/user";

export const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogin = async ({ email, password }: ILoginUser) => {
    setLoading(true);
    setError(null);

    try {
      const data: IUser = await loginUser({ email, password });
      if (data) {
        localStorage.setItem('id', String(data.person_id))
        dispatch(setInfo(data));
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
