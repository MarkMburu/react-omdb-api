import React from "react";
import MovieItem from "../MovieItem/MovieItem";
import styles from "./MovieList.module.css"

const MovieList = ({ movies, currentPage, pageSize }) => {
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedMovies = movies.slice(startIndex, endIndex);

  return (
    <section className={styles.cards}>
      {displayedMovies.map((movie) => (
        <MovieItem key={movie.imdbID} movie={movie} />
      ))}
    </section>
  );
};

export default MovieList;
