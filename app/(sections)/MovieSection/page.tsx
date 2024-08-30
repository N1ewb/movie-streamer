"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  getMoviesByPopular,
  getTopRatedMovies,
  getUpcomingMovies,
} from "@/lib/global";
import { Movie } from "@/lib/types";
import MovieList from "@/app/(components)/MoviesStrip";

const MovieSection: React.FC = () => {
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);

  const fetchMovies = async (
    fetcher: (page: number) => Promise<Movie[]>,
    setMovies: React.Dispatch<React.SetStateAction<Movie[]>>,
    page: number = 1
  ) => {
    try {
      const movies = await fetcher(page);
      setMovies(movies);
    } catch (error) {
      console.error(
        "Error fetching movies:",
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  };

  const movieSections = [
    {
      header: "Popular Movies",
      fetch: () => fetchMovies(getMoviesByPopular, setPopularMovies),
      movies: popularMovies,
      movieListRef: useRef<HTMLDivElement>(null),
    },
    {
      header: "Top Rated Movies",
      fetch: () => fetchMovies(getTopRatedMovies, setTopRatedMovies),
      movies: topRatedMovies,
      movieListRef: useRef<HTMLDivElement>(null),
    },
    {
      header: "Upcoming Movies",
      fetch: () => fetchMovies(getUpcomingMovies, setUpcomingMovies),
      movies: upcomingMovies,
      movieListRef: useRef<HTMLDivElement>(null),
    },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateScreenSize = () => {
        setScreenSize({ width: window.innerWidth, height: window.innerHeight });
      };

      updateScreenSize();
      window.addEventListener("resize", updateScreenSize);
      return () => window.removeEventListener("resize", updateScreenSize);
    }
  }, []);

  return (
    <div className="flex flex-col relative items-center justify-between max-w-full xsm:top-44  xxsm:top-10 xxxxsm:top-28">
      {movieSections.map((section, index) => (
        <div key={index} className="flex movie-list-page-container max-w-full">
          <MovieList
            handleSlideContainer={(direction) =>
              section.movieListRef.current &&
              section.movieListRef.current.scrollBy({
                left:
                  direction === "left"
                    ? -(screenSize.width - screenSize.width / 5.3)
                    : screenSize.width - screenSize.width / 5.3,
                behavior: "smooth",
              })
            }
            movieListRef={section.movieListRef}
            section={section}
            movieList={section.movies}
          />
        </div>
      ))}
    </div>
  );
};

export default MovieSection;
