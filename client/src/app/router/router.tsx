import { createBrowserRouter, replace } from "react-router-dom";
import { MainPage, LoginPage } from "@pages/index";

export class RoutePaths {
    static main = "/";
    static auth = "/auth";
}

const loginPage = {
    path: RoutePaths.auth,
    element: <LoginPage />,
};

const mainPage = {
    path: RoutePaths.main,
    element: <MainPage />,
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
