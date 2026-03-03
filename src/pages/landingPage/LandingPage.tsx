import { useFetchLandings } from "../../hooks/useFetchLandings";
import { useFilteredObjects } from "../../hooks/useFilter";
import { SearchBar } from "../../components/searchBar/SearchBar";
import { useEffect, useRef } from "react";
import { FilteringBtn } from "../../components/filteringBtns/FilteringBtn";
import { CardWithLoading } from "../../components/card/Card";
import { PaginationBtns } from "../../components/paginationBtns/PaginationBtns";
import style from './LandingPage.module.css'

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

  useEffect(() => {
    if (!landingsLoading && !landingsError) {
      searchBarFocusRef.current?.focus();
    }
  }, [landingsLoading, landingsError]);

  if (landingsError) return <div>Error: {landingsError}</div>;

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
            key={landing.name}
            name={landing.name}
            date={landing.date}
            imgUrl={landing.imageUrl}
            isSuccessful={landing.success}
            isLoading={landingsLoading}
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