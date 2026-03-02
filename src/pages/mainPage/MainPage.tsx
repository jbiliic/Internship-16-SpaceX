import { useFetchCompany } from "../../hooks/useFetchCompany"
import { useFetchNextLaunchTime } from "../../hooks/useFetchNextLaunchTime";
import { useNavigate } from "react-router-dom";
import { CountdownWithLoading } from "../../components/countdown/Countdown";
import styles from './MainPage.module.css'
import spaceVideo from '../../assets/spaceBack.mp4';
export const MainPage = () => {
  const { companyData, companyError, companyLoading   } = useFetchCompany();
  const { nextLaunchTime, nextLaunchTimeError, nextLaunchTimeLoading } = useFetchNextLaunchTime();
  const navigate = useNavigate();

  if (companyLoading) return <div>Loading...</div>;
  if (companyError || nextLaunchTimeError) return <div>Error: {companyError || nextLaunchTimeError}</div>;

  return (
    <div className={styles.mainPage}>
      <video src={spaceVideo} className={styles.background}  autoPlay muted loop playsInline/>
      <h1 className={styles.mainPageTitle}>Main page</h1>
      <div className={styles.countdownContainer}>
        {nextLaunchTime && <CountdownWithLoading isLoading={nextLaunchTimeLoading} targetDate={nextLaunchTime} />}
      </div>
      {companyData && (
        <div className={styles.companyInfo}>
          <h2>{companyData.name} was founded in {companyData.founded} by {companyData.founder}. {companyData.name}  
            currently has {companyData.employees} employees and is based in {companyData.location}. 
          </h2>
          <p className={styles.summary}>{companyData.summary}</p>
        </div>
      )}
      <div className={styles.buttonContainer}>
        <button onClick={() => navigate('/launch')} className={styles.navButton}>Launches</button>
        <button onClick={() => navigate('/ship')} className={styles.navButton}>Ships</button>
      </div>
    </div>
  )
}