import { Navigate, useLocation, useNavigate } from "react-router-dom";
import type { Ship } from "../../types/ship";
import styles from './ShipDetailsPage.module.css'
import { routes } from "../../constants/routes";

export const ShipDetailsPage = () => {
    const location = useLocation();
    const ship = location.state?.shipData as Ship;
    const navigate = useNavigate();
    console.log("Ship data in details page:", ship);

    if (!ship || typeof ship !== 'object' || !ship.id) {
        return (
            <Navigate
                to={routes.ERROR}
                state={{ errorMessage: "Ship data not found or session expired." }}
                replace
            />
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.backBtn}>
                <button onClick={() => navigate(-1)}>Back</button>
            </div>
            <div className={styles.imgContainer}>
                <h1>{ship.name}</h1>
                {ship.imageUrl && (
                    <img src={ship.imageUrl} alt={ship.name} />
                )}
            </div>

            <div className={styles.generalInfo}>
                <h2>General Information</h2>
                <ul>
                    <li>ID: {ship.id}</li>
                    <li>Type: {ship.type}</li>
                    <li>Status: {ship.active ? "Active" : "Inactive"}</li>
                    <li>Home Port: {ship.homePort}</li>
                    <li>Year Built: {ship.yearBuilt ?? "N/A"}</li>
                    <li>Mass: {ship.massKg ? `${ship.massKg} kg` : "N/A"}</li>
                </ul>
            </div>

            <div className={styles.roles}>
                <h2>Roles</h2>
                {ship.roles.length > 0 ? (
                    <ul>
                        {ship.roles.map((role, index) => (
                            <li key={index}>{role}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No roles assigned</p>
                )}
            </div>
        </div>
    );
}