import { Movie } from "types/Movie";
import MovieCard from "components/MovieCard";
import { useState } from "react";
import { FaCaretRight } from "react-icons/fa";

type GenreProps = {
  genreName: string;
  movies: Movie[];
};

export default function Genre(props: GenreProps) {
  const [moviesToDisplay, setMoviesToDisplay] = useState<Movie[]>(props.movies);

  const handleClick = () => {
    const [first, ...rest] = moviesToDisplay;
    setMoviesToDisplay([...rest, first]);
  };

  return (
    <div className="flex relative">
      <div className=" flex overflow-hidden flex-col">
        <div className="font-bold">{props.genreName}</div>
        <div className="flex gap-4 pt-1">
          {moviesToDisplay &&
            moviesToDisplay.map((movie) => <MovieCard movie={movie} />)}
        </div>
      </div>
      <button
        className="absolute right-0 opacity-70 -mr-2 -mt-2 top-1/2"
        onClick={handleClick}
      >
        <FaCaretRight size={50} color={"#d9d8d9"} />
      </button>
    </div>
  );
}
