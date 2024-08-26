import Image from "next/image";
import React from "react";

interface SearchedMovieProps {
  movie: any;
}

const SearchedMovieCard: React.FC<SearchedMovieProps> = ({ movie }) => {
  return (
    <div className="Searched-movie-card-container w-[200px] h-[500px] text-center">
      <Image
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        alt={`${movie.original_title} backdrop`}
        width={200}
        height={240}
        style={{ height: "auto", width: "200px" }}
        className="object-cover"
      />
      <p className="m-0">{movie.original_title}</p>
    </div>
  );
};

export default SearchedMovieCard;
