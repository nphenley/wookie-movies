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

export const search = async (
  searchTerm: string,
  callback: (movies: Movie[]) => void
) => {
  const fetchedMovies = await fetch(
    `https://wookie.codesubmit.io/movies?q=${searchTerm}`,
    {
      headers: new Headers({
        Authorization: "Bearer Wookie2021",
      }),
    }
  );
  const resultingMovies = await fetchedMovies.json();
  callback(resultingMovies.movies);
};
