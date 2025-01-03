import styles from "./NavMenu.module.scss";
import userLogo from "@shared/assets/image/user-icon.png";
import { RoutePaths } from "@app/router/router";
import { MenuPageItem } from "./ui/MenuPageItem";
import { usePlaylist } from "@features/playlist/model/usePlaylist";
import { useEffect, useState } from "react";
import { IPlaylist } from "@entities/playlist/model/playlist";
import { MenuPlaylistItem } from "./ui/MenuPlaylistItem";

const NavMenu = () => {
  const mainMenu = {
    items: [
      {
        title: "Home",
        route: RoutePaths.homePage,
      },
      {
        title: "Add new track",
        route: RoutePaths.addNewTrack,
      },
      {
        title: "Create new playlist",
        route: RoutePaths.createNewPlaylist,
      },
      {
        title: "Settings",
        route: RoutePaths.settingPage,
      },
    ],
    smallSize: false,
  };

  const collectionMenu = {
    items: [
      {
        title: "All Tracks",
        route: RoutePaths.allTrack,
      },
      {
        title: "My tracks",
        route: RoutePaths.favoritesTracks,
      },
    ],
    smallSize: true,
  };

  const { getAllPlaylist } = usePlaylist();
  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const userPlaylist = await getAllPlaylist();
        console.log("11", userPlaylist);
        if (userPlaylist) {
          setPlaylists(userPlaylist);
        }
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchPlaylists();
  }, []);

  return (
    <nav className={styles.menu}>
      <div className={styles.menu__wrapper}>
        <img src={userLogo} />
        <span>qwerty</span>
      </div>

      <ul className={styles.sidebar}>
        <MenuPageItem list={mainMenu} />
      </ul>

      <ul className={styles.sidebar}>
        <p className={styles.sidebar__title}>My collection</p>
        <MenuPageItem list={collectionMenu} />
      </ul>

      <ul className={styles.sidebar}>
        <p className={styles.sidebar__title}>My playlists</p>
        {playlists && <MenuPlaylistItem playlists={playlists} />}
      </ul>
    </nav>
  );
};

export default NavMenu;
