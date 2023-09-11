const API_KEY = process.env.REACT_APP_API_KEY;
const URI = process.env.REACT_APP_API_URL;

const getMovieRequest = async (searchValue) => {
  try {
    if (searchValue === "") {
      return { movies: [], error: "" };
    }

    const uri = `${URI}?s=${searchValue}&apikey=${API_KEY}`;
    const response = await fetch(uri);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseJson = await response.json();

    if (responseJson.Response === "False" && responseJson.Error === "Movie not found!") {
      return { movies: [], error: `No movies found with the title ${searchValue} .` };
    }

    if (responseJson.Search) {
      return { movies: responseJson.Search, error: "" };
    }

    return { movies: [], error:"" };
  } catch (error) {
    return { movies: [], error: "An error occurred." };
  }
};

export default getMovieRequest;
