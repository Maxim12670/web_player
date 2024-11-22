import styles from "./MainPage.module.scss";
import { ContentContainer } from "@shared/ui";
import { NavMenu } from "@widgets/ui";

const MainPage = () => {
    return (
        <ContentContainer>
            <div className={styles["main-page__wrapper"]}>
                <div className={styles["main-page__menu"]}>
                    <NavMenu />
                </div>

                <div className={styles["main-page__content"]}>
                    content content content content content content content content content
                </div>
            </div>
        </ContentContainer>
    );
};

export default MainPage;
