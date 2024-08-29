import Image from "next/image";
import React from "react";
import TrailerCard from "./TrailerCard";
import { Movie } from "@/lib/types";

interface MovieCardProps {
  movie: Movie;
}

const PopularMovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className={`card-container text-white  text-center flex flex-col z-0`}>
      <Image
        src={
          movie.backdrop_path
            ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
            : "/movie-cover/alya.jpg"
        }
        alt={`${movie.original_title} backdrop`}
        width={300}
        height={160}
        className="object-cover cursor-pointer"
        priority
      />
    </div>
  );
};

export default PopularMovieCard;
