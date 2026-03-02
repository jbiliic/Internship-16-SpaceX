import LoadingCircle from "../../components/loadingCircle/LoadingCircle";
import { useFetchLandings } from "../../hooks/useFetchLandings";
import { useFilteredObjects } from "../../hooks/useFilter";

export const LandingPage = () => {
    const { landingsData, landingsError, landingsLoading, currentPage } = useFetchLandings();
    const { filteredObjects,
       setSearchQuery,
        isFiltering, 
        setIsSuccessful, 
        setIsUpcoming } 
        = useFilteredObjects(landingsData || [], true);

    if (landingsLoading) return <LoadingCircle />;
    if (landingsError) return <div>Error: {landingsError}</div>;

  return (
    <>
      <input type="text"  placeholder="Search..."/>
    </>
  )
}