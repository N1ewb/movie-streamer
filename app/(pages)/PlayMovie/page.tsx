"use client";

import SimilarMovieCard from "@/app/(components)/SimilarMovieCard";
import { getMovieByID, getSimilarMovie } from "@/lib/global";
import { Movie, MovieDetail } from "@/lib/types";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const PlayMovie = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [videoURL, setVideoUrl] = useState<string>();
  const [movie, setMovie] = useState<MovieDetail>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const movieListRef = useRef<HTMLDivElement>(null);
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const updateScreenSize = () => {
    setScreenSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };
  const handleSlideContainer = (direction: "left" | "right") => {
    if (movieListRef.current) {
      const scrollAmount = screenSize.width * 0.28;
      movieListRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };
  useEffect(() => {
    if (typeof window !== undefined) {
      window.addEventListener("resize", updateScreenSize);
      return () => window.removeEventListener("resize", updateScreenSize);
    }
  }, []);
  useEffect(() => {
    if (id) {
      const movieID = parseInt(id);

      setIsLoading(true);

      const fetchData = async () => {
        try {
          const movieData = await getMovieByID(movieID);
          const res = JSON.parse(movieData);
          setMovie(res);
          const similarMoviesData = await getSimilarMovie(movieID);
          const filteredSimilarData = similarMoviesData.filter(
            (movie: Movie) => movie.poster_path !== null
          );
          setSimilarMovies(filteredSimilarData);
        } catch (error) {
          console.error("Error fetching movie data:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      const URLVidSrc = `https://vidsrc.xyz/embed/movie?tmdb=${id}`;
      setVideoUrl(URLVidSrc);
    }
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="play-movie-page-container min-h-screen w-full text-white flex flex-col items-center pt-32 font-Roboto">
      <div className="movie-player-container w-full h-100% flex justify-center items-center ">
        <iframe
          className="w-[80%] h-[85vh] rounded-[5px]"
          src={videoURL}
          title="YouTube video player"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; encrypted-media; "
          referrerPolicy="strict-origin-when-cross-origin"
        ></iframe>
      </div>
      <div className="play-movie-bottom-content w-[80%] py-8 pb-80 flex flex-row justify-between ">
        <div className="more-movie-details flex flex-row w-[60%] border-solid border-2 border-[#2f3031] bg-[#0f0f0f] p-3 justify-between rounded-[3px]">
          <div className="left-detail w-[30%]">
            <Image
              src={
                movie?.belongs_to_collection !== null
                  ? `https://image.tmdb.org/t/p/original${movie?.belongs_to_collection.poster_path}`
                  : "/movie-cover/alya.jpg"
              }
              alt={movie?.original_title || "movie photobg"}
              height={400}
              width={196}
            />
          </div>
          <div className="right-detail w-[70%] flex flex-col gap-3">
            <h1 className="text-3xl font-bold font-Roboto ">
              {movie?.original_title}
            </h1>
            <p className="flex flex-row gap-4 font-Roboto">
              <span className="font-Roboto">{movie?.vote_average}</span>{" "}
              <span className="text-[#ffffff8f]">out of</span>{" "}
              <span className="font-Roboto">{movie?.vote_count}</span>{" "}
              <span className="font-Roboto">
                <span className="text-[#ffffff8f]">Release date: </span>
                {movie?.release_date}
              </span>
            </p>
            <div className="movie-genres-list flex flex-row gap-4">
              <p className="text-[#ffffff8f]">Genres:</p>
              {movie && movie.genres.length !== 0
                ? movie.genres.map((genre) => (
                    <p key={genre.id}>{genre.name}</p>
                  ))
                : "No Genres"}
            </div>
            <p className="text-[#ffffff8f]">Overview:</p>
            <p className="font-Roboto text-[16px]">{movie?.overview}</p>
            <p className="flex flex-row gap-4">
              <span className="font-Roboto">
                <span className="text-[#ffffff8f]"> Status:</span>{" "}
                {movie?.status}
              </span>{" "}
              <span className="font-Roboto">
                {" "}
                <span className="text-[#ffffff8f]"> Tagline:</span>{" "}
                {movie?.tagline}
              </span>
            </p>
          </div>
        </div>
        <div className="similar-movies-container w-[40%] px-5 py-2">
          <h1 className="font-semibold text-1xl">Related Movies {">>"}</h1>
          <div className="similar-movies flex flex-row overflow-auto w-[100%] scrollbar-hide gap-3">
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
              className="flex flex-row overflow-auto w-[100%] scrollbar-hide gap-3"
              ref={movieListRef}
            >
              {similarMovies && similarMovies.length !== 0 ? (
                similarMovies.map((movie: Movie) => (
                  <div key={movie.id} className="">
                    {" "}
                    <SimilarMovieCard movie={movie} />
                  </div>
                ))
              ) : (
                <h1>No similar movies found</h1>
              )}
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
      </div>
    </div>
  );
};

export default PlayMovie;
