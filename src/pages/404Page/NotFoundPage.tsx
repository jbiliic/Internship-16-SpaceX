import { useNavigate } from "react-router-dom";
import { routes } from "../../constants/routes";
import styles from "./NotFoundPage.module.css";

export const NotFoundPage = () => {

    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1>Navigation Error</h1>
                <p>
                    The orbital coordinates you are looking for do not exist.
                    The page has likely been decommissioned or moved to a different sector.
                </p>
                <button
                    className={styles.homeBtn}
                    onClick={() => navigate(routes.HOME)}
                >
                    Return to Mission Control
                </button>
            </div>
        </div>
    );
}