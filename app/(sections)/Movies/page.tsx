"use client";
import React, { useEffect, useRef, useState } from "react";
import { Movie } from "@/lib/types";
import { getMoviesByPopular } from "@/lib/global";
import PopularMovieCard from "@/app/(components)/PopularMovieCard";
import Image from "next/image";

const MovieList = () => {
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const movieListRef = useRef<HTMLDivElement>(null);
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleGetMoviesByPopular = async (page: number) => {
    try {
      const movies = await getMoviesByPopular(page);
      setMovieList(movies);
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else if (error) {
        console.log("Error is unknown");
      }
    }
  };

  useEffect(() => {
    handleGetMoviesByPopular(1);
  }, []);

  const updateScreenSize = () => {
    setScreenSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      window.addEventListener("resize", updateScreenSize);
      return () => window.removeEventListener("resize", updateScreenSize);
    }
  }, []);

  const handleSlideContainer = (direction: "left" | "right") => {
    if (movieListRef.current) {
      const scrollAmount = screenSize.width - screenSize.width / 6;
      movieListRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className=" movies-list-container p-[45px] max-w-full text-white z-20">
      <div className="movies-list-header">
        <h1 className="font-semibold text-3xl">Popular</h1>
      </div>
      <div className=" popular-movies-content-container flex flex-row items-center justify-between p-[30px] w-full">
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
          className="movie-list-container flex flex-row w-[95%] gap-3 overflow-auto scrollbar-hide "
          ref={movieListRef}
        >
          {movieList && movieList.length !== 0
            ? movieList.map((movie: Movie) => (
                <div key={movie.id} className=" movie-card-container">
                  <PopularMovieCard movie={movie} />
                </div>
              ))
            : ""}
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
