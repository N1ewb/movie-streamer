import Image from "next/image";
import React from "react";

export interface MovieCardProps {
  movie: any;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="text-white w-[160px] text-center">
      <Image
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        alt={`${movie.original_title} backdrop`}
        objectFit="cover"
        width={160}
        height={100}
      />
      {movie.original_title}
    </div>
  );
};

export default MovieCard;
