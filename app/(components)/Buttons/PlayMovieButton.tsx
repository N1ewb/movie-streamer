import { Movie } from "@/lib/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface PlayMovieButtonProps {
  PlayButtonClass: string;
  imgWidth: number;
  imgHeight: number;
  movie: Movie;
}

const PlayMovieButton = ({
  PlayButtonClass,

  imgWidth,
  imgHeight,
  movie,
}: PlayMovieButtonProps) => {
  const router = useRouter();

  const handleClickPlayMovie = () => {
    if (movie?.id) {
      router.push(`/PlayMovie?id=${encodeURIComponent(movie.id.toString())}`);
    } else {
      console.error("Movie ID is not defined.");
    }
  };

  return (
    <button onClick={() => handleClickPlayMovie()} className={PlayButtonClass}>
      <Image
        src="/play-button-arrowhead.png"
        alt="Play"
        width={imgHeight ? imgHeight : 25}
        height={imgWidth ? imgWidth : 25}
         className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
      />
      Play
    </button>
  );
};

export default PlayMovieButton;
