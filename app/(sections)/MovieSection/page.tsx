"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  getMoviesByPopular,
  getTopRatedMovies,
  getUpcomingMovies,
} from "@/lib/global";
import { Movie } from "@/lib/types";
import MovieList from "@/app/(components)/Movies/MoviesStrip";
import ShowsModal from "@/app/(components)/ShowsModal/ShowsModal";

const MovieSection: React.FC = () => {
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie>();
  const [showModal, setShowModal] = useState<boolean>(false);

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
    <div className="flex flex-col items-center justify-between max-w-full md:mt-96 sm:mt-80 xsm:mt-36  xxsm:mt-10 xxxxsm:mt-10 text-white z-50">
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
            setSelectedMovie={setSelectedMovie}
            setShowModal={setShowModal}
          />
        </div>
      ))}
      {selectedMovie && (
        <ShowsModal
          type="movie"
          show={showModal}
          onClose={() => setShowModal(false)}
          movie={selectedMovie}
        />
      )}
    </div>
  );
};

export default MovieSection;
