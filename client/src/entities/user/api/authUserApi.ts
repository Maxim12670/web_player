import axiosInstance from "@shared/api/axiosInstace";
import { IUser } from "../model/user";

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IRegistrUsert {
  email: string;
  login: string;
  password: string;
}

class ApiPath {
  static login = "auth/login";
  static register = "auth/register";
}

export const loginUser = async ({ email, password }: ILoginUser) => {
  const response = await axiosInstance.post(ApiPath.login, {
    email: email,
    password: password,
  });

  return response.data;
};

export const registrUser = async ({ email, login, password }: IRegistrUsert) => {
  const response = await axiosInstance.post(ApiPath.register, {
    email: email,
    login: login,
    password: password,
  });

  return response.data;
};
