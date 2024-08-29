import { Movie } from "@/lib/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface SimilarMovieCardProps {
  movie: Movie;
}

const SimilarMovieCard: React.FC<SimilarMovieCardProps> = ({ movie }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const handleClickPlayMovie = () => {
    if (movie?.id) {
      router.push(
        `/PlayMoviePage?id=${encodeURIComponent(movie.id.toString())}`
      );
    } else {
      console.error("Movie ID is not defined.");
    }
  };
  return (
    <div className="similar-movie-card-container relative text-white w-[160px] text-center flex flex-col gap-2 ">
      {movie.poster_path ? (
        <Image
          onClick={() => handleClickPlayMovie()}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={
            !isHovered
              ? "object-cover opacity-[1] hover:scale-[1.1] hover:opacity-[0.4] transition-all ease-in-out duration-300 cursor-pointer"
              : "object-cover scale-[1.1] opacity-[0.4] transition-all ease-in-out duration-300 cursor-pointer"
          }
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={movie?.original_title || "movie photobg"}
          width={160}
          height={256}
        />
      ) : (
        ""
      )}
      {isHovered ? (
        <Image
          onClick={() => handleClickPlayMovie()}
          onMouseEnter={() => setIsHovered(true)}
          className="absolute top-[25%] left-[20%] cursor-pointer"
          src="/play-button-orange.png"
          alt="play"
          height={100}
          width={100}
        />
      ) : (
        ""
      )}
      <p className="truncate">{movie.title}</p>
    </div>
  );
};

export default SimilarMovieCard;
