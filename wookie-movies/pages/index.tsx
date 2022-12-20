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
    <div className="flex items-center justify-center h-screen">
      <div className="lds-dual-ring" />{" "}
    </div>
  );

  const noResultsView = (
    <div className="flex flex-col items-center justify-center p-12">
      <Image src={"/assets/noResults.png"} width={50} height={50} alt={""} />
      <div>No results</div>
    </div>
  );

  const resultsView = (
    <div className="px-4">
      <div className="mt-10 font-bold">Results:</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {movies.map((movie) => (
          <div key={movie.id} className="flex justify-center mb-3">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );

  const fewResultsView = (
    <div className="px-4">
      <div className="mt-10 font-bold">Results:</div>
      <div className="grid grid-cols-1 gap-3 sm:flex">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="flex justify-center mb-3 sm:justify-start"
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );

  const allGenresView = (
    <div className="flex flex-col gap-12 px-4 mt-10">
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
      <div className="min-h-screen pb-3 text-lg text-secondary bg-background">
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
                <>
                  {movies.length
                    ? movies.length < 3
                      ? fewResultsView
                      : resultsView
                    : noResultsView}
                </>
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
