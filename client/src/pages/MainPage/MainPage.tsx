import styles from "./MainPage.module.scss";
import { ContentContainer } from "@shared/ui";
import { NavMenu, AudioPlayer } from "@widgets/ui";
import { Outlet } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@app/store/hooks";
import { getUserInfo } from "@entities/user/api/userApi";
import { setInfo } from "@app/store/storeSlices/userSlice";
import { IUser } from "@entities/user/model/user";
import { useEffect } from "react";

const MainPage = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user.person_id && localStorage.getItem("id")) {
        const data = await getUserInfo(Number(localStorage.getItem("id")));
        if (data) dispatch(setInfo(data as IUser));
      }
    };

    fetchUserData();
  }, []);

  return (
    <ContentContainer>
      <div className={styles["main-page__wrapper"]}>
        <div className={styles["main-page__menu"]}>
          <NavMenu />
        </div>

        <div className={styles["main-page__content"]}>
          <Outlet />
        </div>
        <div className={styles.player}>
          <AudioPlayer />
        </div>
      </div>
    </ContentContainer>
  );
};

export default MainPage;
