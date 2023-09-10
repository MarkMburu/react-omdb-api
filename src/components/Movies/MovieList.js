// import React from "react";
// import MovieItem from "./MovieItem";

// const MovieList = ({ movies }) => {
//   return (
//     <section className="cards">
//       {movies.map((movie) => (
//         <MovieItem key={movie.imdbID} movie={movie} />
//       ))}
//     </section>
//   );
// };

// export default MovieList;

import React from "react";
import MovieItem from "./MovieItem";

const MovieList = ({ movies, currentPage, pageSize }) => {
  // Calculate the start and end indices of the movies to display on the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Slice the movies array to get the movies for the current page
  const displayedMovies = movies.slice(startIndex, endIndex);

  return (
    <section className="cards">
      {displayedMovies.map((movie) => (
        <MovieItem key={movie.imdbID} movie={movie} />
      ))}
    </section>
  );
};

export default MovieList;
