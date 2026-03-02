import { useDarkTheme } from "../../providers/darkTheme/useDarkTheme";
import styles from "./NavBar.module.css"; 

export const NavBar = () => {
    const { isDarkTheme, toggleDarkTheme } = useDarkTheme();

  return (
    <nav className={styles.navBar}>
      <h1 className={styles.navTitle}>SpaceX Dashboard</h1>
      
      <div className={styles.btnsContainer}>
        <button className={styles.navBtn}>Main</button>
        <button className={styles.navBtn}>Launches</button>
        
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