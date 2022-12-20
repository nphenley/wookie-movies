import { Movie } from "types/Movie";

export const search = async (
  searchTerm: string,
  callback: (movies: Movie[]) => void,
  loadingCallback: any
) => {
  const fetchedMovies = await fetch(
    !searchTerm
      ? "https://wookie.codesubmit.io/movies"
      : `https://wookie.codesubmit.io/movies?q=${searchTerm}`,
    {
      headers: new Headers({
        Authorization: "Bearer Wookie2021",
      }),
    }
  );
  const resultingMovies = await fetchedMovies.json();
  callback(resultingMovies.movies);
  loadingCallback(false);
};
