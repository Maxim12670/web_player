import { createBrowserRouter, redirect, replace } from "react-router-dom";
import { MainPage, LoginPage, HomePage, SettingPage, AddNewTrack, CreateNewPlaylist } from "@pages/index";
import { useAppSelector } from "@app/store/hooks";


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

const MainPageWrapper = () => {
  const user = useAppSelector((state) => state.user);

  if (!user.person_id && !localStorage.getItem("id")) {
    return <LoginPage />;
  }

  return <MainPage />;
};

const mainPage = {
  path: RoutePaths.main,
  element: <MainPageWrapper />,
  children: [
    { path: "", loader: () => redirect(RoutePaths.homePage) },
    homePage,
    addNewTrack,
    settingPage,
    createNewPlaylist,
  ],
};

const router = createBrowserRouter([mainPage, loginPage]);

export default router;
