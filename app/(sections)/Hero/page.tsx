"use client";
import React, { useEffect, useState } from "react";

import { getMoviesByPopular } from "@/lib/global";
import { Movie } from "@/lib/types";
import HeroMovies from "@/app/(components)/Movies/HeroMovies";

const Hero = () => {
  const [activeNumber, setActiveNumber] = useState(0);
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleClickRight = () => {
    setActiveNumber((prevNumber) =>
      prevNumber >= movieList.length - 1 ? 0 : prevNumber + 1
    );
  };

  const handleClickLeft = () => {
    setActiveNumber((prevNumber) =>
      prevNumber <= 0 ? movieList.length - 1 : prevNumber - 1
    );
  };

  const handleGetMoviesByPopular = async (page: number) => {
    try {
      const movies = await getMoviesByPopular(page);
      setMovieList(movies);
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("Unknown Error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetMoviesByPopular(1);
  }, []);

  return (
    <div className="hero-page-container text-white flex flex-row items-center h-[75vh] w-full ">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <button
            className="absolute top-[50%] left-0 z-30 hidden"
            onClick={handleClickLeft}
          >
            Left
          </button>
          <div className="movie-container h-[100%] xl:h-[50%] w-full">
            {movieList.length > 0 && (
              <HeroMovies movie={movieList[activeNumber]} />
            )}
          </div>
          <button
            className="absolute top-[50%] right-0 hidden"
            onClick={handleClickRight}
          >
            Right
          </button>
        </>
      )}
    </div>
  );
};

export default Hero;
