import styles from "./NavMenu.module.scss";
import userLogo from "@shared/assets/image/user-icon.png";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "@app/router/router";

const NavMenu = () => {
    const navigate = useNavigate();

    const handleClick = (path: string) => {
        navigate(path);
    };

    return (
        <nav className={styles.menu}>
            <div className={styles.menu__wrapper}>
                <img src={userLogo} />
                <span>MaximAka</span>
            </div>

            <ul className={styles.sidebar}>
                <li className={styles.sidebar__item} onClick={() => handleClick(RoutePaths.homePage)}>
                    Home
                </li>
                <li className={styles.sidebar__item} onClick={() => handleClick(RoutePaths.addNewTrack)}>
                    Add new track
                </li>
                <li className={styles.sidebar__item}>Create new playlists</li>
                <li className={styles.sidebar__item} onClick={() => handleClick(RoutePaths.settingPage)}>
                    Settings
                </li>
            </ul>

            <ul className={styles.sidebar}>
                <p className={styles.sidebar__title}>My collection</p>
                <li className={`${styles.sidebar__item} ${styles.sidebar__item_small}`}>Tracks</li>
                <li className={`${styles.sidebar__item} ${styles.sidebar__item_small}`}>Playlists</li>
            </ul>

            <ul className={styles.sidebar}>
                <p className={styles.sidebar__title}>My Playlists</p>
                <li className={`${styles.sidebar__item} ${styles.sidebar__item_small}`}>Playlists 1</li>
                <li className={`${styles.sidebar__item} ${styles.sidebar__item_small}`}>Playlists 2</li>
                <li className={`${styles.sidebar__item} ${styles.sidebar__item_small}`}>Playlists 2</li>
            </ul>
        </nav>
    );
};

export default NavMenu;
