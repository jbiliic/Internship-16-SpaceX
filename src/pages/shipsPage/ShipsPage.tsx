import { useEffect, useRef } from "react";
import { SearchBar } from "../../components/searchBar/SearchBar";
import { useFetchShips } from "../../hooks/useFetchShips"
import { CardWithLoading } from "../../components/card/Card";
import { routes } from "../../constants/routes";
import type { Ship } from "../../types/ship";
import { useNavigate } from "react-router-dom";
import styles from './ShipsPage.module.css'

export const ShipsPage = () => {
    const { ships, shipError, shipLoading, searchQuery, setSearchQuery, ref } = useFetchShips();
    const navigate = useNavigate();

    const searchBarFocusRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!shipLoading && !shipError) {
            searchBarFocusRef.current?.focus();
        }
    }, [shipLoading, shipError]);

    const handleCardClick = (ship: Ship) => {
        navigate(routes.SHIP_DETAILS.replace(":id", ship.id), {
            state: { shipData: ship }
        });
    };

    if (shipError) navigate(routes.ERROR, { state: { errorMessage: shipError } });

    return (
        <div className="page-container">
            <div className="search-bar-container">
                <SearchBar ref={searchBarFocusRef} value={searchQuery} onChange={setSearchQuery} />
            </div>

            <div className={styles.shipsList} >
                {ships.map((ship) => (
                    <CardWithLoading
                        key={ship.id}
                        name={ship.name}
                        date={ship.yearBuilt?.toString() ?? "Unknown"}
                        imgUrl={ship.imageUrl || "https://placehold.co/600x400?text=No+Image"}
                        isLoading={false}
                        onClick={() => handleCardClick(ship)}
                    />
                ))}
            </div>
            <div ref={ref} style={{ height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            </div>
        </div>
    )
}