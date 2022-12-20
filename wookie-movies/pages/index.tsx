import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import Genre from "components/Genre";
import TopBar from "components/TopBar";
import { search } from "helpers/apiCall";
import { Movie } from "types/Movie";
import { allGenres } from "constants/genres";
import MovieCard from "components/MovieCard";
import { useRouter } from "next/router";
import Details from "components/Details";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [detailView, setDetailView] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setDetailView(false);
    if (!router.query.search && !router.query.movie) return setSearchTerm("");
    let searchTerm;
    if (router.query.movie) {
      setDetailView(true);
      searchTerm = Array.isArray(router.query.movie)
        ? ""
        : router.query.movie == undefined
        ? ""
        : router.query.movie;
    } else {
      searchTerm = Array.isArray(router.query.search)
        ? ""
        : router.query.search == undefined
        ? ""
        : router.query.search;
    }
    setSearchTerm(searchTerm);
  }, [router]);

  useEffect(() => {
    setMovies([]);
    setLoading(true);
    search(searchTerm, (movies: Movie[]) => setMovies(movies), setLoading);
  }, [searchTerm]);

  const loadingSpinner = (
    <div className="flex items-center h-screen justify-center">
      <div className="lds-dual-ring" />{" "}
    </div>
  );

  const noResultsView = (
    <div className="flex flex-col p-12 justify-center items-center">
      <Image src={"/assets/noResults.png"} width={50} height={50} alt={""} />
      <div>No results</div>
    </div>
  );

  const resultsView = (
    <>
      <div className="font-bold px-4 mt-10">Results:</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4">
        {movies.map((movie) => (
          <div key={movie.id} className="flex justify-center mb-3">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </>
  );

  const allGenresView = (
    <div className="flex flex-col gap-12 mt-10 px-4">
      {allGenres.map((genre) => (
        <Genre
          key={genre}
          genreName={genre}
          movies={movies.filter((movie) => movie.genres.includes(genre))}
        />
      ))}
    </div>
  );

  return (
    <>
      <Head>
        <title>Wookie Movies</title>
        <meta
          name="description"
          content="Wookie Movies, the best movies Earth has to offer."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="text-secondary pb-3 text-lg min-h-screen bg-background">
        <TopBar />
        {detailView ? (
          loading ? (
            loadingSpinner
          ) : (
            <Details movie={movies[0]} />
          )
        ) : (
          <>
            {searchTerm ? (
              loading ? (
                loadingSpinner
              ) : (
                <>{movies.length ? resultsView : noResultsView}</>
              )
            ) : movies.length ? (
              allGenresView
            ) : (
              loadingSpinner
            )}
          </>
        )}
      </div>
    </>
  );
}
