"use client";
import React, { useEffect } from "react";
import { Movie } from "@/lib/types";
import Image from "next/image";
import PopularMovieCard from "@/app/(components)/Cards/PopularMovieCard";

interface MovieListProps {
  handleSlideContainer: (direction: "left" | "right") => void;
  movieListRef: React.RefObject<HTMLDivElement>;
  section: any;
  movieList: Movie[];
}

const MovieList = ({
  handleSlideContainer,
  movieListRef,
  section,
  movieList,
}: MovieListProps) => {
  useEffect(() => {
    section.fetch();
  }, []);

  return (
    <div className="movies-list-container p-[45px] max-w-full text-white z-20  flex flex-col">
      <div className="movies-list-header">
        <h1 className="font-semibold text-3xl">{section.header}</h1>
      </div>
      <div className="popular-movies-content-container flex flex-row items-center justify-between p-[30px] w-full">
        <button
          className="cursor-pointer"
          onClick={() => handleSlideContainer("left")}
        >
          <Image
            className="hover:-translate-x-1 transition-transform duration-300"
            src="/left-arrow.png"
            alt="left"
            width={25}
            height={25}
            style={{ height: "auto", width: "auto" }}
          />
        </button>
        <div
          className="movie-list-container flex flex-row w-[95%] gap-3 overflow-auto scrollbar-hide"
          ref={movieListRef}
        >
          {movieList.map((movie: Movie) => (
            <div key={movie.id} className="flex movie-card-container">
              <PopularMovieCard movie={movie} />
            </div>
          ))}
        </div>
        <button
          className="cursor-pointer"
          onClick={() => handleSlideContainer("right")}
        >
          <Image
            className="hover:translate-x-1 transition-transform duration-300"
            src="/right-arrow.png"
            alt="right"
            width={25}
            height={25}
            style={{ height: "auto", width: "auto" }}
          />
        </button>
      </div>
    </div>
  );
};

export default MovieList;
