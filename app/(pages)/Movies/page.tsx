"use client";
import React, { useEffect, useState } from "react";
import fetch from "node-fetch";
import MovieCard from "@/app/(components)/MovieCard";

interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);

  const url =
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDk1ODFlNWQ1ZGZjNTc5NjBlYzhkMWY5YTVmNzQ0MyIsIm5iZiI6MTcyNDU1NzcwMi44NzcwNzQsInN1YiI6IjY2YzgyZmI1OGZlZDdjY2Q3NGMzY2MxYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ied4arbplyzEc_U18Y4APreGJlgy6jyheo0WEY1IWBg",
    },
  };

  useEffect(() => {
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setMovieList(json.results))
      .catch((err) => console.error("error:" + err));
  }, []);

  return (
    <div className="p-[50px] text-white">
      <h3>Movie List</h3>
      <div className="movie-list-container flex flex-row flex-wrap w-full  gap-5">
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
