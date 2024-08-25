import Image from "next/image";
import React from "react";

interface MovieCardProps {
  movie: any;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="card-container text-white w-[160px] text-center flex flex-col gap-6 hover:opacity-[0.8] ">
      <Image
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        alt={`${movie.original_title} backdrop`}
        width={160}
        height={240}
        style={{ height: "auto", width: "160px" }}
        className="object-cover"
      />
      <p className="m-0">{movie.original_title}</p>
    </div>
  );
};

export default MovieCard;
