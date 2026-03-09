import { useLocation, useNavigate } from "react-router-dom";
import { useFetchRocket } from "../../hooks/useFetchRocket";
import { type Landing } from "../../types/landings.ts";
import style from './LandingDetailsPage.module.css'
import LoadingCircle from "../../components/loadingCircle/LoadingCircle.tsx";
import { routes } from "../../constants/routes.ts";

export const LandingDetailsPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const landing = location.state?.landingData as Landing;
    const { rocketData, rocketLoading, rocketError } = useFetchRocket(landing?.rocketId || "");

    if (rocketError) navigate(routes.NOT_FOUND, { state: { errorMessage: rocketError } });
    if (!landing) return <div className={style.error}>Mission data not found.</div>;

    return (
        <div className={style.pageWrapper}>
            <nav className={style.nav}>
                <button onClick={() => navigate(-1)} className={style.backBtn}>
                    &larr; Back
                </button>
            </nav>

            <div className={style.mainContent}>
                <section className={style.header}>
                    <div className={style.titleGroup}>
                        <span className={style.missionLabel}>MISSION LOG</span>
                        <h1>{landing.name}</h1>
                        <div className={`${style.badge} ${landing.success ? style.success : style.fail}`}>
                            {landing.success ? "SUCCESSFUL LANDING" : "LANDING FAILURE"}
                        </div>
                    </div>
                    <p className={style.description}>{landing.description}</p>
                </section>

                <div className={style.detailsGrid}>
                    <section className={style.glassPanel}>
                        <h3>ROCKET SPECIFICATIONS</h3>
                        {rocketLoading ? <LoadingCircle /> : (rocketData && (
                            <div className={style.specList}>
                                <div className={style.specItem}>
                                    <span>ROCKET NAME</span>
                                    <span className={style.accent}>{rocketData.name}</span>
                                </div>
                                <div className={style.specItem}>
                                    <span>VEHICLE STATUS</span>
                                    <span className={rocketData.active ? style.active : style.retired}>
                                        {rocketData.active ? "ACTIVE" : "RETIRED"}
                                    </span>
                                </div>
                                <div className={style.specItem}>
                                    <span>HEIGHT</span>
                                    <span>{rocketData.height}m</span>
                                </div>
                                <div className={style.specItem}>
                                    <span>MASS</span>
                                    <span>{(rocketData.mass / 1000).toLocaleString()} t</span>
                                </div>
                                <div className={style.specItem}>
                                    <span>LAUNCH COST</span>
                                    <span className={style.price}>${(rocketData.cost / 1_000_000)}M</span>
                                </div>
                            </div>
                        ))}
                    </section>
                    <section className={style.glassPanel}>
                        <h3>MISSION ASSETS</h3>
                        <div className={style.linkGroup}>
                            {landing.videoUrl && (
                                <a href={landing.videoUrl} target="_blank" rel="noreferrer" className={style.mediaLink}>
                                    VIEW MISSION FOOTAGE (External)
                                </a>
                            )}
                        </div>
                        <div className={style.imageGallery}>
                            <img src={landing.imageUrl} alt="Mission" className={style.galleryImg} />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};