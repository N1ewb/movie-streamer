"use client";
import React, { useEffect, useState } from "react";
import fetch from "node-fetch";
import MovieCard from "@/app/(components)/MovieCard";
import { Movie } from "@/lib/types";
import { getMoviesByPopular } from "@/lib/global";

const MovieList = () => {
  const [movieList, setMovieList] = useState<Movie[]>([]);

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

  return (
    <div className="p-[55px] max-w-full  text-white  ">
      <h3>Popular</h3>
      <div className="movie-list-container flex flex-row w-full gap-5 overflow-auto scrollbar-hide">
        {movieList && movieList.length !== 0
          ? movieList.map((movie: Movie) => (
              <div key={movie.id} className="movie-card-container ">
                <MovieCard movie={movie} />
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default MovieList;
