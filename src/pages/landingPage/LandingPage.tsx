import { useFetchLandings } from "../../hooks/useFetchLandings";
import { useFilteredObjects } from "../../hooks/useFilter";
import { SearchBar } from "../../components/searchBar/SearchBar";
import { useEffect, useRef } from "react";
import { FilteringBtn } from "../../components/filteringBtns/FilteringBtn";
import { CardWithLoading } from "../../components/card/Card";
import { PaginationBtns } from "../../components/paginationBtns/PaginationBtns";
import style from './LandingPage.module.css'
import { useNavigate } from "react-router-dom";
import type { Landing } from "../../types/landings.ts";
import { routes } from "../../constants/routes.ts";

export const LandingPage = () => {
  const { landingsData, landingsError, landingsLoading, currentPage, setCurrentPage } = useFetchLandings();
  const { filteredObjects,
    searchQuery,
    setSearchQuery,
    isFiltering,
    setIsSuccessful,
    setIsUpcoming }
    = useFilteredObjects(landingsData || [], true);
  const searchBarFocusRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleCardClick = (landing: Landing) => {
    navigate(routes.LAUNCH_DETAILS.replace(":id", landing.id), {
      state: { landingData: landing }
    });
  };

  useEffect(() => {
    if (!landingsLoading && !landingsError) {
      searchBarFocusRef.current?.focus();
    }
  }, [landingsLoading, landingsError]);

  if (landingsError) navigate(routes.ERROR, { state: { errorMessage: landingsError } });

  return (
    <div className={style.landingPage}>
      <div className={style.searchBarContainer}>
        <SearchBar ref={searchBarFocusRef} value={searchQuery} onChange={setSearchQuery} />

        <div className={style.filterButtons}>
          <FilteringBtn onChange={setIsSuccessful} options={["Successful", "Unsuccessful"]} />
          <FilteringBtn onChange={setIsUpcoming} options={["Upcoming", "Not Upcoming"]} />
        </div>
      </div>
      <div className={style.landingsList}>
        {!isFiltering && filteredObjects.map((landing) => (
          <CardWithLoading
            key={landing.id}
            name={landing.name}
            date={landing.date}
            imgUrl={landing.imageUrl}
            isSuccessful={landing.success}
            isLoading={landingsLoading}
            onClick={() => handleCardClick(landing)}
          />
        ))}
      </div>
      <div className={style.paginationContainer}>
        <PaginationBtns
          onPrevious={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          onNext={() => setCurrentPage(prev => prev + 1)}
          currentPage={currentPage}
        />
      </div>
    </div>
  )
}