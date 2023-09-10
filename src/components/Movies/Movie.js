import React,{useState,useEffect} from "react";
import getMovieRequest from "../../services/MovieService";
import SearchBox from "../Search/SearchBox";
import MovieList from "./MovieList";

const Movie = () => {
    const [movies, setMovies] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8; // Set the number of movies to display per page

    useEffect(() => {
        const fetchData = async () => {
          const movieData = await getMovieRequest(searchValue);
          setMovies(movieData);
        };
        fetchData();
      }, [searchValue]);

    // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

    return (
      <div>
        <div>
          <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} placeholder="Type to Search A Movie"/>
        </div>
        <div>
      <h1>Movie List</h1>
      <MovieList movies={movies} currentPage={currentPage} pageSize={pageSize} />
      {/* Add pagination controls here */}
      <div>
        <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
        <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
      </div>
    </div>
        {/* <div>
          <MovieList movies={movies} />
        </div> */}
      </div>
    );
  }
  export default Movie;