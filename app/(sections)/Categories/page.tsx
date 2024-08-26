"use client";
import { Genres, Movie } from "@/lib/types";
import React, { useEffect, useState } from "react";
import {
  getMovieGenres,
  getMoviesByPopular,
  Getoptions,
  URLForGenreList,
} from "@/lib/global";
import GenreCards from "@/app/(components)/GenreCards";

const MovieGenre = () => {
  const [genreList, setGenreList] = useState<Genres[]>([]);
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

  const handleGetMovieGenres = async () => {
    try {
      const genres = await getMovieGenres();
      setGenreList(genres);
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
    handleGetMovieGenres();
  }, []);

  const getMoviesForGenre = (genreId: number) => {
    return movieList.filter((movie) => movie.genre_ids.includes(genreId));
  };

  return (
    <div className="categories-container relative top-[210px] text-white w-full p-10 bg-black">
      <h1 className="font-bold text-[35px]">Genres</h1>
      <div className="genre-cards-container">
        {genreList.length > 0 ? (
          genreList.map((genre: Genres) => (
            <div key={genre.id} className="genre-cards">
              <GenreCards genre={genre} movies={getMoviesForGenre(genre.id)} />
            </div>
          ))
        ) : (
          <p>No genres found</p>
        )}
      </div>
    </div>
  );
};

export default MovieGenre;
