import { Movie } from "types/Movie";
import Image from "next/image";
import { FaImdb } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";

type DetailProps = {
  movie: Movie;
};

export default function Details(props: DetailProps) {
  return (
    <div className="md:mr-8">
      <div className="flex h-full mt-10 justify-center">
        <div className="sm:w-2/5 w-0 md:mx-4  ">
          <Image
            style={{ objectFit: "cover" }}
            unoptimized={true}
            src={props.movie.poster}
            width={600}
            height={1000}
            alt={`${props.movie.title} poster.`}
          />
        </div>
        <div className="sm:w-2/3 w-11/12 flex flex-col gap-4">
          <div className="flex justify-between">
            <div className="flex gap-4">
              <div className="font-bold text-3xl">{props.movie.title}</div>
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
                {props.movie.director.length == 2
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

          <div className="tracking-tightest text-2xl">
            {props.movie.overview}
          </div>
        </div>
      </div>
    </div>
  );
}
