import Head from "next/head";
import { useEffect, useState } from "react";
import Genre from "components/Genre";
import TopBar from "components/TopBar";
import { getMovies } from "helpers/apiCall";
import { Movie } from "types/Movie";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>();

  useEffect(() => {
    getMovies((movies: Movie[]) => setMovies(movies));
  }, []);

  return (
    <>
      <Head>
        <title>Wookie Movies</title>
        <meta name="description" content="Wookie Movies" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" text-secondary min-h-screen bg-background">
        <TopBar />
        {movies ? (
          <div className="flex flex-col gap-14 mt-10 px-4">
            <Genre genreName="Sci-Fi" movies={movies} />
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
}
