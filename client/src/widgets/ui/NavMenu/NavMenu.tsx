import styles from "./NavMenu.module.scss";
import userLogo from "@shared/assets/image/user-icon.png";

const NavMenu = () => {
    return (
        <nav className={styles.menu}>
            <div className={styles.menu__wrapper}>
                <img src={userLogo} />
                <span>MaximAka</span>
            </div>

            <ul className={styles.sidebar}>
                <li className={styles.sidebar__item}>Home</li>
                <li className={styles.sidebar__item}>Settings</li>
            </ul>

            <ul className={styles.sidebar}>
                <p className={styles.sidebar__title}>My collection</p>
                <li className={`${styles.sidebar__item} ${styles.sidebar__item_small}`}>Home</li>
                <li className={`${styles.sidebar__item} ${styles.sidebar__item_small}`}>Settings</li>
                <li className={`${styles.sidebar__item} ${styles.sidebar__item_small}`}>Home 1</li>
                <li className={`${styles.sidebar__item} ${styles.sidebar__item_small}`}>Settings 1</li>
            </ul>
        </nav>
    );
};

export default NavMenu;
