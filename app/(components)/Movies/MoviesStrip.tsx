"use client";
import React, { useEffect } from "react";
import { Movie } from "@/lib/types";
import Image from "next/image";
import PopularMovieCard from "@/app/(components)/Cards/PopularShowCard";

interface MovieListProps {
  handleSlideContainer: (direction: "left" | "right") => void;
  movieListRef: React.RefObject<HTMLDivElement>;
  section: any;
  movieList: Movie[];
  setSelectedMovie: React.Dispatch<React.SetStateAction<Movie | undefined>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const MovieList = ({
  handleSlideContainer,
  movieListRef,
  section,
  movieList,
  setSelectedMovie,
  setShowModal,
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
            width={15}
            height={15}
            style={{ height: "auto", width: "auto" }}
          />
        </button>
        <div
          className="movie-list-container flex flex-row w-[95%] gap-3 overflow-auto scrollbar-hide"
          ref={movieListRef}
        >
          {movieList.map((movie: Movie) => (
            <div key={movie.id} className="flex movie-card-container">
              <PopularMovieCard
                type="movie"
                show={movie}
                setSelectedShow={setSelectedMovie}
                setShowModal={setShowModal}
              />
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
            width={15}
            height={15}
            style={{ height: "auto", width: "auto" }}
          />
        </button>
      </div>
    </div>
  );
};

export default MovieList;
