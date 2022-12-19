import Head from "next/head";
import { useEffect, useState } from "react";
import Genre from "components/Genre";
import TopBar from "components/TopBar";
import { getMovies, search } from "helpers/apiCall";
import { Movie } from "types/Movie";
import { allGenres } from "constants/genres";
import MovieCard from "components/MovieCard";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>();
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getMovies((movies: Movie[]) => setMovies(movies));
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) return setFilteredMovies([]); //To prevent empty string searches.
    search(searchTerm, (movies: Movie[]) => setFilteredMovies(movies));
  }, [searchTerm]);

  useEffect(() => {
    console.log(searchTerm);
  }, [searchTerm]);

  return (
    <>
      <Head>
        <title>Wookie Movies</title>
        <meta name="description" content="Wookie Movies" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" text-secondary text-lg min-h-screen bg-background">
        <TopBar setSearchTerm={setSearchTerm} />
        {filteredMovies.length ? (
          <>
            <div className="font-bold px-4 mt-10">Results:</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4">
              {filteredMovies.map((movie) => (
                <div className="flex justify-center mb-3">
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          </>
        ) : movies ? (
          <div className="flex flex-col gap-12 mt-10 px-4">
            {allGenres.map((genre) => (
              <Genre
                genreName={genre}
                movies={movies.filter((movie) => movie.genres.includes(genre))}
              />
            ))}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
}
