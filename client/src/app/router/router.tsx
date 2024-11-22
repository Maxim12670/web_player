import { createBrowserRouter, replace } from "react-router-dom";
import { MainPage, LoginPage, HomePage, SettingPage } from "@pages/index";

export class RoutePaths {
    static auth = "/auth";
    static main = "/";
    static homePage = "home";
    static settingPage = "setting";
}

const loginPage = {
    path: RoutePaths.auth,
    element: <LoginPage />,
};

const homePage = {
  path: RoutePaths.homePage,
  element: <HomePage />,
};

const settingPage = {
  path: RoutePaths.settingPage,
  element: <SettingPage />,
};

const mainPage = {
    path: RoutePaths.main,
    element: <MainPage />,
    children: [homePage, settingPage],
    loader: () => {
        if (!localStorage.getItem("userId")) {
            console.log("я на авторизацию");
            return replace(RoutePaths.auth);
            // получение информации о пользователе по id
        }
        console.log("я на главной");
        return null;
    },
};

const router = createBrowserRouter([mainPage, loginPage]);

export default router;
