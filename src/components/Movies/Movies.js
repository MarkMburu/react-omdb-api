// import React,{useState,useEffect} from "react";
// import getMovieRequest from "../../services/MovieService";
// import SearchBox from "../Search/SearchBox";
// import MovieList from "./MovieLIst/MovieList";
// import styles from "./Movies.module.css";

// const Movies = () => {
//     const [movies, setMovies] = useState([]);
//     const [searchValue, setSearchValue] = useState("");
//     const [currentPage, setCurrentPage] = useState(1);
//     const pageSize = 8;

//     useEffect(() => {
//         const fetchData = async () => {
//           const movieData = await getMovieRequest(searchValue);
//           setMovies(movieData);
//         };
//         fetchData();
//       }, [searchValue]);
//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };
//   const totalPages = Math.ceil(movies.length / pageSize);
//   return (
//     <div>
//       <div>
//         <SearchBox
//           searchValue={searchValue}
//           setSearchValue={setSearchValue}
//           placeholder="Type to Search A Movie"
//         />
//       </div>
//       <div>
//         {movies.length > pageSize ? (
//           <div>
//             <MovieList
//               movies={movies}
//               currentPage={currentPage}
//               pageSize={pageSize}
//             />
//             <div className={styles.paginationContainer}>

//               <button className={styles.previous} disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
//                 Previous
//               </button>
//               <button className={styles.next} disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>Next</button>
//             </div>
//           </div>
//         ) : (
//           <MovieList movies={movies} />
//         )}
//       </div>
//     </div>
//   );
// };
//   export default Movies;
import React, { useState, useEffect } from "react";
import getMovieRequest from "../../services/MovieService";
import SearchBox from "../Search/SearchBox";
import MovieList from "./MovieLIst/MovieList";
import styles from "./Movies.module.css";
import Header from "../Header/Header";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const pageSize = 8;

  useEffect(() => {
    const fetchData = async () => {
      if (searchValue === "") {
        setMovies([]);
        return;
      }
      setIsLoading(true);
      const movieData = await getMovieRequest(searchValue);
      setIsLoading(false);
      if (movieData === 0) {
        setMovies([]);
      } else {
        setMovies(movieData);
        setCurrentPage(1); // Reset the current page when new data is fetched.
      }
    };
    fetchData();
  }, [searchValue]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(movies.length / pageSize);

  return (
    <div>
      <Header heading="Movie Hub"/>
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
        ) : movies.length === 0 && searchValue !== "" ? (
          <div className={styles.loadingContainer}>
            <p className={styles.loadingText}>No movies found with the title of {searchValue} .</p> 
            
            </div>
    
        ) : movies.length > pageSize ? (
          <div>
            <MovieList
              movies={movies}
              currentPage={currentPage}
              pageSize={pageSize}
            />
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
          </div>
        ) : (
          <MovieList movies={movies} />
        )}
      </div>
    </div>
  );
};

export default Movies;
