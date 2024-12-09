import styles from "./MainPage.module.scss";
import { ContentContainer } from "@shared/ui";
import { NavMenu } from "@widgets/ui";
import { Outlet } from "react-router-dom";

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
        <div className={styles.player}></div>
      </div>
    </ContentContainer>
  );
};

export default MainPage;
