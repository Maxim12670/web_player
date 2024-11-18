import { IUser } from "@entities/user/model/user";
import axiosInstance from "@shared/api/axiosInstace";

export const getUserInfo = async (id: number) => {
    const response = await axiosInstance.get<IUser>("user/info", {
        params: { id: id },
    });

    return response.data;
};
