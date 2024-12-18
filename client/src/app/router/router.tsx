import { createBrowserRouter, replace } from "react-router-dom";
import { MainPage, LoginPage, HomePage, SettingPage, AddNewTrack, CreateNewPlaylist } from "@pages/index";

export class RoutePaths {
  static auth = "/auth";
  static main = "/";
  static homePage = "home";
  static addNewTrack = "add-new-track";
  static settingPage = "setting";
  static createNewPlaylist = "create-new-playlist";
}

const loginPage = {
  path: RoutePaths.auth,
  element: <LoginPage />,
};

const homePage = {
  path: RoutePaths.homePage,
  element: <HomePage />,
};

const addNewTrack = {
  path: RoutePaths.addNewTrack,
  element: <AddNewTrack />,
};

const createNewPlaylist = {
  path: RoutePaths.createNewPlaylist,
  element: <CreateNewPlaylist />,
};

const settingPage = {
  path: RoutePaths.settingPage,
  element: <SettingPage />,
};

const mainPage = {
  path: RoutePaths.main,
  element: <MainPage />,
  children: [
    { path: "", loader: () => replace(RoutePaths.homePage) },
    homePage,
    addNewTrack,
    settingPage,
    createNewPlaylist,
  ],
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
