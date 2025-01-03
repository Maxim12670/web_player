import { IUser } from "@entities/user/model/user";
import axiosInstance from "@shared/api/axiosInstace";

export const getUserInfo = async (id: number) => {
  try {
    const response = await axiosInstance.get<IUser>("user/info", {
      params: { id },
    });

    return response.data as IUser;
  } catch (err) {
    if (err instanceof Error) return err.message;
  }
};
