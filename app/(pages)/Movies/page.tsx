"use client";
import React, { useEffect, useState } from "react";
import fetch from "node-fetch";
import MovieCard from "@/app/(components)/MovieCard";
import { Movie } from "@/lib/types";
import { Getoptions, URLForMovieList } from "@/lib/global";

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    fetch(URLForMovieList, Getoptions)
      .then((res) => res.json())
      .then((json) => setMovieList(json.results))
      .catch((err) => console.error("error:" + err));
  }, []);

  return (
    <div className="p-[55px] max-w-full  text-white  ">
      <h3>Movie List</h3>
      <div className="movie-list-container flex flex-row w-full gap-5  overflow-auto scrollbar-hide">
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
