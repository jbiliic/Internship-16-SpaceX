import { useDarkTheme } from "../../providers/darkTheme/useDarkTheme";
import styles from "./NavBar.module.css"; 
import {routes} from "../../constants/routes.ts";
import { useNavigate } from "react-router-dom";
export const NavBar = () => {
    const { isDarkTheme, toggleDarkTheme } = useDarkTheme();
    const navigate = useNavigate();
  return (
    <nav className={styles.navBar}>
      <h1 className={styles.navTitle}>SpaceX Dashboard</h1>
      
      <div className={styles.btnsContainer}>
        <button className={styles.navBtn} onClick={() => navigate(routes.HOME)}>Main</button>
        <button className={styles.navBtn} onClick={() => navigate(routes.LAUNCH)}>Launches</button>
        
        <button className={styles.toggleTheme} onClick={toggleDarkTheme}>
          {isDarkTheme ? '☀️' : '🌙'}
          <span className={styles.toggleText}>
            {isDarkTheme ? 'Light' : 'Dark'}
          </span>
        </button>
      </div>
    </nav>
  )
}