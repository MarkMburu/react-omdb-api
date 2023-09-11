import React,{useState,useEffect} from "react";
import getMovieRequest from "../../services/MovieService";
import SearchBox from "../Search/SearchBox";
import MovieList from "./MovieLIst/MovieList";
import styles from "./Movies.module.css";

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8;

    useEffect(() => {
        const fetchData = async () => {
          const movieData = await getMovieRequest(searchValue);
          setMovies(movieData);
        };
        fetchData();
      }, [searchValue]);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <div>
        <SearchBox
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          placeholder="Type to Search A Movie"
        />
      </div>
      <div>
        {movies.length > pageSize ? (
          <div>
            <MovieList
              movies={movies}
              currentPage={currentPage}
              pageSize={pageSize}
            />
            <div className={styles.paginationContainer}>

              <button className={styles.previous} onClick={() => handlePageChange(currentPage - 1)}>
                Previous
              </button>
              <button className={styles.next} onClick={() => handlePageChange(currentPage + 1)}>Next</button>
            </div>
          </div>
        ) : (
          <MovieList movies={movies} />
        )}
      </div>
    </div>
  );
};
  export default Movies;