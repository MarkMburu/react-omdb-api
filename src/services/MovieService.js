const API_KEY = process.env.REACT_APP_API_KEY;
const URI = process.env.REACT_APP_API_URL;

const getMovieRequest = async (searchValue) => {
  const uri = `${URI}?s=${searchValue}&apikey=${API_KEY}`;
  const response = await fetch(uri);
  const responseJson = await response.json();
  if (responseJson.Search) {
    return responseJson.Search;
  }
  return [];
};

export default getMovieRequest;
