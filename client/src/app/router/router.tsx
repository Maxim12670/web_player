import { createBrowserRouter, redirect, replace } from "react-router-dom";
import {
  MainPage,
  LoginPage,
  HomePage,
  SettingPage,
  AddNewTrackPage,
  CreateNewPlaylistPage,
  AllTracksPage,
} from "@pages/index";
import { useAppSelector } from "@app/store/hooks";
import { getAllTracks } from "@entities/track/api/trackApi";

export class RoutePaths {
  static auth = "/auth";
  static main = "/";
  static homePage = "home";
  static addNewTrack = "add-new-track";
  static allTrack = "all-tracks";
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

const addNewTrackPage = {
  path: RoutePaths.addNewTrack,
  element: <AddNewTrackPage />,
};

const createNewPlaylistPage = {
  path: RoutePaths.createNewPlaylist,
  element: <CreateNewPlaylistPage />,
};

const allTracksPage = {
  path: RoutePaths.allTrack,
  element: <AllTracksPage />,
  loader: async () => {
    const tracks = await getAllTracks();
    return tracks;
  },
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
    addNewTrackPage,
    createNewPlaylistPage,
    settingPage,
    allTracksPage,
  ],
};

const router = createBrowserRouter([mainPage, loginPage]);

export default router;
