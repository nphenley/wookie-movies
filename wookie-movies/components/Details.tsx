import { Movie } from "types/Movie";
import Image from "next/image";
import { FaImdb } from "react-icons/fa";
// @ts-ignore
import ReactStars from "react-rating-stars-component";

type DetailProps = {
  movie: Movie;
};

export default function Details(props: DetailProps) {
  return (
    <div className="md:mr-8">
      <div className="flex justify-center h-full mt-10">
        <div className="w-0 lg:w-1/4 sm:1/3 md:mx-4 ">
          <Image
            style={{ objectFit: "cover" }}
            unoptimized={true}
            src={props.movie.poster}
            width={600}
            height={1000}
            alt={`${props.movie.title} poster.`}
          />
        </div>
        <div className="flex flex-col w-11/12 gap-4 sm:w-2/3">
          <div className="flex justify-between">
            <div className="flex gap-4">
              <div className="text-3xl font-bold">{props.movie.title}</div>
              <div className="flex items-center">
                {props.movie.imdb_rating} <FaImdb size={30} />
              </div>
            </div>

            <div>
              <ReactStars
                edit={false}
                half={true}
                value={props.movie.imdb_rating / 2}
                size={33}
                activeColor="#ffd700"
              />
            </div>
          </div>
          <div>
            <div className="flex gap-2">
              <div>{new Date(props.movie.released_on).getFullYear()}</div>|
              <div>{props.movie.length}</div>|
              <div>
                {Array.isArray(props.movie.director)
                  ? props.movie.director[0]
                  : props.movie.director}
              </div>
            </div>
            <div className="flex">
              Cast:
              {props.movie.cast.map((member) => (
                <div className="ml-2">{member}</div>
              ))}
            </div>
          </div>

          <div className="text-2xl tracking-tightest">
            {props.movie.overview}
          </div>
        </div>
      </div>
    </div>
  );
}
