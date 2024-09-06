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
      if (movie.type === "movie") {
        router.push(
          `/PlayMoviePage?id=${encodeURIComponent(movie.id.toString())}`
        );
      } else {
        router.push(
          `/PlayTVPage?id=${encodeURIComponent(
            movie.id.toString()
          )}&ep=${encodeURIComponent(1)}`
        );
      }
    } else {
      console.error("Movie ID is not defined.");
    }
  };

  return (
    <div
      className="relative text-white w-[150px] sm:w-[125px] xsm:w-[110px] xxsm:w-[90px] flex flex-col items-center justify-start gap-2 p-2 bg-[#141414] rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-opacity-80"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {movie.poster_path ? (
        <div className="relative w-full cursor-pointer overflow-hidden rounded-lg">
          <Image
            onClick={handleClickPlayMovie}
            className="object-cover rounded-lg transition-transform duration-500 ease-in-out transform hover:scale-110 lg:w-[180px] h-auto"
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={movie?.original_title || "movie poster"}
            width={200}
            height={300}
          />
          {isHovered && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <Image
                onClick={handleClickPlayMovie}
                src="/play-button-orange.png"
                alt="play"
                height={50}
                width={50}
                className="transition-transform transform hover:scale-125"
              />
            </div>
          )}
        </div>
      ) : (
        <div className="w-full h-[300px] flex items-center justify-center bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-400">No Image Available</p>
        </div>
      )}
      <p className="text-sm md:text-base lg:text-lg font-semibold truncate w-full text-center">
        {movie.title ? movie.title : movie.name}
      </p>
    </div>
  );
};

export default SimilarMovieCard;
