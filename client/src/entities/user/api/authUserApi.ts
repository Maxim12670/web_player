import axiosInstance from "@shared/api/axiosInstace";

export interface ILoginUser {
    email: string;
    password: string;
}

export interface IRegistrUsert {
    email: string;
    login: string;
    password: string;
}

export const loginUser = async ({ email, password }: ILoginUser) => {
    const response = await axiosInstance.post("auth/login", {
        email: email,
        password: password,
    });

    return response.data;
};

export const registrUser = async ({ email, login, password }: IRegistrUsert) => {
    const response = await axiosInstance.post("auth/register", {
        email: email,
        login: login,
        password: password,
    });

    return response.data;
};
