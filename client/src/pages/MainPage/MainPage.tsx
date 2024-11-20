import styles from "./MainPage.module.scss";
import { ContentContainer } from "@shared/ui";

const MainPage = () => {
    return (
        <ContentContainer>
            <div className={styles['main-page__wrapper']}>
                <nav className={styles['main-page__menu']}>
                  menu menu menu menu menu
                  menu menu menu menu menu
                  menu menu menu menu menu
                </nav>

                <div className={styles['main-page__content']}>
                  content content content
                  content content content
                  content content content
                </div>
            </div>
        </ContentContainer>
    );
};

export default MainPage;
