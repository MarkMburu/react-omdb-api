/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render } from "@testing-library/react";
import MovieList from "./MovieList";

jest.mock("../MovieItem/MovieItem", () => {
  return function MockMovieItem(props) {
    return <div data-testid={`mock-movie-item-${props.movie.imdbID}`} />;
  };
});

describe("MovieList Component", () => {
  const movies = [
    {
      Title: "Indiana Jones and the Last Crusade",
      Year: "1989",
      imdbID: "tt0097576",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BY2Q0ODg4ZmItNDZiYi00ZWY5LTg2NzctNmYwZjA5OThmNzE1XkEyXkFqcGdeQXVyMjM4MzQ4OTQ@._V1_SX300.jpg",
    },
    {
      Title: "Star Wars: Episode VIII - The Last Jedi",
      Year: "2017",
      imdbID: "tt2527336",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMjQ1MzcxNjg4N15BMl5BanBnXkFtZTgwNzgwMjY4MzI@._V1_SX300.jpg",
    },
  ];
  const currentPage = 1;
  const pageSize = 2;

  it("should render the correct number of MovieItem components", () => {
    const { getAllByTestId } = render(
      <MovieList
        movies={movies}
        currentPage={currentPage}
        pageSize={pageSize}
      />
    );

    // eslint-disable-next-line testing-library/prefer-screen-queries
    const movieItemComponents = getAllByTestId(/^mock-movie-item-/);
    expect(movieItemComponents).toHaveLength(pageSize);
  });
});
