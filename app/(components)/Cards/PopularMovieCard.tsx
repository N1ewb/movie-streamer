import Image from "next/image";
import React, { useState } from "react";
import { Movie } from "@/lib/types";
import PlayMovieButton from "../Buttons/PlayMovieButton";
import MoreInfoButton from "../Buttons/MoreInfoButton";
import { useRouter } from "next/navigation";

interface MovieCardProps {
  movie: Movie;
}

const PopularMovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const PlayButtonClass =
    "bg-white py-1 px-4 rounded-[3px] text-black hover:bg-[#ffffffc0] flex flex-row gap-2 items-center";
  const MoreInfoClass =
    "bg-[#7575757a] py-1 px-4 rounded-[3px] text-white hover:bg-[#75757544] flex flex-row gap-2 items-center";
  const handleClickPlayButton = () => {
    if (movie?.id) {
      router.push(`/PlayMovie?id=${encodeURIComponent(movie.id.toString())}`);
    } else {
      console.error("Movie ID is not defined.");
    }
  };

  const handleClickMoreInfo = () => {};

  return (
    <div
      className={`card-container relative text-white flex flex-col z-0 w-[300px] h-[auto]`}
    >
      <Image
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        src={
          movie.backdrop_path
            ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
            : "/movie-cover/alya.jpg"
        }
        alt={`${movie.original_title} backdrop`}
        width={300}
        height={160}
        className={
          !isHovered
            ? "object-cover  opacity-[1]"
            : "object-cover  opacity-[0.8]  bg-neutral-700"
        }
        priority
      />
      {isHovered ? (
        <div
          className="absolute top-0 flex flex-col p-4 justify-between h-[100%] w-[100%]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <h1 className="font-semibold text-xl">{movie.title}</h1>
          <div className="buttons-container w-[100%] flex flex-row justify-around font-semibold">
            <PlayMovieButton
              PlayButtonClass={PlayButtonClass}
              movie={movie}
              imgWidth={15}
              imgHeight={15}
            />
            <MoreInfoButton
              movie={movie}
              MoreInfoButtonClass={MoreInfoClass}
              imgWidth={15}
              imgHeight={15}
            />
          </div>
          <div className="genre-container"></div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default PopularMovieCard;
