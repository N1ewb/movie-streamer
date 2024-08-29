import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface SearchedMovieProps {
  movie: any;
}

const SearchedMovieCard: React.FC<SearchedMovieProps> = ({ movie }) => {
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
    <div className="Searched-movie-card-container relative w-[200px] h-[500px] text-center z-0">
      <Image
        onClick={() => handleClickPlayMovie()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        alt={`${movie.original_title} backdrop`}
        width={200}
        height={240}
        style={{ height: "auto", width: "auto" }}
        className={
          !isHovered
            ? "object-cover opacity-[1] hover:scale-[1.1] hover:opacity-[0.4] transition-all ease-in-out duration-300 cursor-pointer"
            : "object-cover scale-[1.1] opacity-[0.4] transition-all ease-in-out duration-300 cursor-pointer"
        }
      />
      {isHovered ? (
        <Image
          onClick={() => handleClickPlayMovie()}
          onMouseEnter={() => setIsHovered(true)}
          className="absolute top-[20%] left-[25%] cursor-pointer"
          src="/play-button-orange.png"
          alt="play"
          height={100}
          width={100}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default SearchedMovieCard;
