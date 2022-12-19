import Image from "next/image";
import { Movie } from "types/Movie";

type MovieCardProps = {
  movie: Movie;
};

export default function MovieCard(props: MovieCardProps) {
  return (
    <div className="relative min-w-[300px] min-h-[45px]">
      <Image
        className="brightness-[70%]"
        style={{ objectFit: "cover" }}
        unoptimized={true}
        src={props.movie.backdrop}
        width={300}
        height={45}
        alt={`Backdrop for ${props.movie.title}`}
      />

      <div className="absolute inset-0 flex items-end text-background p-2">
        <div>{props.movie.title}</div>
      </div>
    </div>
  );
}
