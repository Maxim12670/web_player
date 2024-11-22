import styles from "./MainPage.module.scss";
import { ContentContainer } from "@shared/ui";
import { NavMenu } from "@widgets/ui";
import { Outlet } from "react-router-dom";
// import { HomePage, SettingPage } from "@pages/index";

const MainPage = () => {
    return (
        <ContentContainer>
            <div className={styles["main-page__wrapper"]}>
                <div className={styles["main-page__menu"]}>
                    <NavMenu />
                </div>

                <div className={styles["main-page__content"]}>
                    <Outlet />
                </div>
            </div>
        </ContentContainer>
    );
};

export default MainPage;
