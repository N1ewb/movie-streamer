"use client";

import { searchMovie } from "@/lib/global";
import { Movie } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import SearchedMovieCard from "../Cards/SearchedMovieCard";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query");

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchedMovie, setSearchedMovies] = useState<Movie[]>([]);
  const [searchValue, setSearchValue] = useState<string>();

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

  useEffect(() => {
    if (searchValue) {
      handleGetMoviesByPopular(1, searchValue);
    }
  }, [searchValue]);

  return (
    <div className="search-page-container bg-black text-white min-h-screen w-full flex flex-col items-center p-10">
      <div className="search-input-container h-[80px] mt-[100px]">
        <input
          name="search"
          type="text"
          placeholder="Search"
          className={`z-50 text-black hidden md:block`}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <div className="searched-movie-container flex flex-row flex-wrap justify-center items-center gap-6 p-10">
        {searchQuery || searchValue ? (
          !isLoading ? (
            searchedMovie &&
            searchedMovie.map((movie: Movie) => (
              <SearchedMovieCard key={movie.id} movie={movie} />
            ))
          ) : (
            <div className="loading-container">Loading...</div>
          )
        ) : (
          <p>Search For Movies </p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
