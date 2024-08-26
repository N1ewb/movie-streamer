"use client";
import SearchedMovieCard from "@/app/(components)/SearchedMovieCard";
import { searchMovie } from "@/lib/global";
import { Movie } from "@/lib/types";
import React, { useEffect, useState } from "react";

const SearchPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchedMovie, setSearchedMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleGetMoviesByPopular = async (page: number, query: string) => {
    try {
      setIsLoading(true);
      const movies = await searchMovie(page, query);
      setSearchedMovies(movies);
      console.log(movies);
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else if (error) {
        console.log("Error is unknown");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      handleGetMoviesByPopular(1, searchQuery);
    }
  }, [searchQuery]);

  return (
    <div className="search-page-container bg-black text-white min-h-screen w-full flex flex-col justify-center items-center p-10">
      <div className="search-input-container ">
        <input
          className="text-black"
          name="search-query"
          type="text"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
          placeholder="Search..."
        />
        <button onClick={() => handleGetMoviesByPopular(1, searchQuery)}>
          Submit
        </button>
      </div>
      <div className="searched-movie-container flex flex-row flex-wrap justify-center items-center gap-6 p-10">
        {!isLoading
          ? searchedMovie &&
            searchedMovie.map((movie: Movie) => (
              <SearchedMovieCard key={movie.id} movie={movie} />
            ))
          : "Loading pa"}
      </div>
    </div>
  );
};

export default SearchPage;
