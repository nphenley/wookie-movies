import { Movie } from "types/Movie";
import MovieCard from "components/MovieCard";

type GenreProps = {
  genreName: string;
  movies: Movie[];
};

export default function Genre(props: GenreProps) {
  return (
    <div className=" flex overflow-x-scroll flex-col">
      <div>{props.genreName}</div>
      <div className="flex gap-4 pt-1">
        {props.movies &&
          props.movies.map((movie) => <MovieCard movie={movie} />)}
      </div>
    </div>
  );
}
