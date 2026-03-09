import style from "./NoResults.module.css";

export const NoResults = () => {
    return (
        <div className={style.NoResultsContainer}>
            <h2>No Results Found</h2>
            <p>We couldn't find any data matching your search criteria. Please try adjusting your search or check back later.</p>
        </div>
    );
}