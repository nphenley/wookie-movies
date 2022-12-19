import { Movie } from "types/Movie";

export const getMovies = async (callback: (movies: Movie[]) => void) => {
  const fetchedMovies = await fetch("https://wookie.codesubmit.io/movies", {
    headers: new Headers({
      Authorization: "Bearer Wookie2021",
    }),
  });
  const allMovies = await fetchedMovies.json();
  callback(allMovies.movies);
};
