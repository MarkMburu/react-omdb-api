import React, { useState, useEffect } from "react";
import getMovieRequest from "../../services/MovieService";
import SearchBox from "../Search/SearchBox";
import MovieList from "./MovieLIst/MovieList";
import styles from "./Movies.module.css";
import Header from "../Header/Header";

const Movies = () => {
  const [moviesData, setMoviesData] = useState({ movies: [], error: "" });
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const pageSize = 8;

  useEffect(() => {
    const fetchData = async () => {
      const { movies, error } = await getMovieRequest(searchValue);
      setIsLoading(false);

      if (error) {
        setMoviesData({ movies: [], error });
      } else {
        setMoviesData({ movies, error: "" });
        setCurrentPage(1);
      }
    };

    if (searchValue !== "") {
      setIsLoading(true);
      fetchData();
    } else {
      setMoviesData({ movies: [], error: "" });
    }
  }, [searchValue]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(moviesData.movies.length / pageSize);

  return (
    <div>
      <Header heading="Movie Hub" />
      <div>
        <SearchBox
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          placeholder="Type to Search A Movie"
        />
      </div>
      <div>
        {isLoading ? (
          <div className={styles.loadingContainer}>
            <p className={styles.loadingText}>Loading...</p>
          </div>
        ) : moviesData.error ? (
          <div className={styles.loadingContainer}>
            <p className={styles.loadingText}>{moviesData.error}</p>
          </div>
        ) : (
          <div>
            <MovieList
              movies={moviesData.movies}
              currentPage={currentPage}
              pageSize={pageSize}
            />
            {moviesData.movies.length > pageSize && (
              <div className={styles.paginationContainer}>
                <button
                  className={styles.previous}
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Previous
                </button>
                <button
                  className={styles.next}
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Movies;
