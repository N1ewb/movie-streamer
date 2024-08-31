import { getMovieByID, getMovieVideos, getSimilarMovie } from "@/lib/global";
import {
  Genre,
  Movie,
  MovieDetail,
  MovieVideo,
  ProductionCompany,
} from "@/lib/types";
import { Volume2, VolumeX } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import PlayMovieButton from "../Buttons/PlayMovieButton";
import SimilarMovieCard from "../Cards/SimilarMovieCard";

interface MovieModalProps {
  show: boolean;
  onClose: () => void;
  movie: Movie;
}

const MovieModal = ({ show, onClose, movie }: MovieModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [movieVideos, setMovieVideos] = useState<MovieVideo[]>([]);
  const [currentMovie, setMovie] = useState<MovieDetail>();
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  const PlayButtonClass =
    "px-10 py-2 bg-white w-[20%] text-black rounded-[5px] text-2xl font-bold flex flex-row items-center gap-3 hover:bg-[#ffffffc0] xl:px-6 xl:py-3 xl:text-xl lg:text-[16px]";

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    if (movie) {
      setIsLoading(true);

      const fetchData = async () => {
        try {
          const movieData = await getMovieByID(movie.id);
          const res = JSON.parse(movieData);
          setMovie(res);
          const similarMoviesData = await getSimilarMovie(movie.id);
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
  }, []);

  useEffect(() => {
    const handleGetMovieVideo = async (movieID: number) => {
      setIsLoading(true);
      console.log(movie.id);
      try {
        const movieVideos = await getMovieVideos(movieID);
        const filterTeasers = movieVideos.filter(
          (video: MovieVideo) =>
            video.type.includes("Teaser") || video.type.includes("Trailer")
        );
        setMovieVideos(filterTeasers);
      } catch (error: Error | unknown) {
        if (error instanceof Error) {
          console.log(`Error in retreiving movie video: ${error.message}`);
        } else {
          console.log("Unknown Error!");
        }
      } finally {
        setIsLoading(false);
      }
    };
    handleGetMovieVideo(movie.id);
  }, [movie.id]);

  useEffect(() => {
    if (show && modalRef.current && !isLoading) {
      modalRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [show, isLoading]);

  if (!show) return null;

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div
      className="absolute min-h-screen w-full top-0 left-0 bg-[#000000cc] bg-opacity-75 flex items-center justify-center pt-[50px] z-[99] "
      ref={modalRef}
    >
      <div className="bg-[#141414] relative rounded-[5px] w-[50%] min-h-screen shadow-lg ">
        <div className="modal-header w-[100%] flex flex-row-reverse absolute right-3 z-30">
          <button
            onClick={onClose}
            className="rounded-full outline-2 bg-[#0000006b] p-2"
          >
            <Image src="/close.png" alt="close" width={17} height={17} />
          </button>
        </div>
        <div
          className="modal-trailer"
          style={{
            position: "absolute",
            width: "100%",
            height: "0",
            paddingBottom: "56.25%",
          }}
        >
          <iframe
            className="absolute"
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${
              movieVideos[0].key
            }?autoplay=1&controls=0&disablekb=1&fs=0&modestbranding=1&rel=0&loop=1&playlist=${
              movieVideos[0].key
            }&showinfo=0&mute=${isMuted ? 1 : 0}`}
            title="YouTube video player"
            frameBorder="0"
            allow=" autoplay;  encrypted-media; gyroscope; "
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <button
            onClick={toggleMute}
            className="absolute bottom-[110px] right-[30px] bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity z-50 1xl:bottom-[%] 1xl:right-[100px] lg:bottom-[150px]"
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </div>
        <div className="modal-content relative flex flex-col z-20 w-full h-[100%] bg-gradient-to-b via-[#1b1b1bd2] from-transparent pt-[40.25%] px-[50px] gap-7">
          <PlayMovieButton
            PlayButtonClass={PlayButtonClass}
            imgWidth={15}
            imgHeight={15}
            movie={movie}
          />
          <div className="div flex flex-row flex-wrap gap-4 w-[20%]">
            <p>{currentMovie?.release_date}</p>
            <p>{currentMovie?.runtime} mins</p>
            <p>Language: {currentMovie?.original_language}</p>
          </div>
          <div className="div w-[100%] flex flex-row">
            <div className="div w-[70%]">
              <p>{currentMovie?.overview}</p>
            </div>
            <div className="div w-[30%]">
              <div className="genres-container flex flex-row flex-wrap gap-2">
                <span className="text-[#646464]">Genres: </span>
                {currentMovie?.genres.map((genre: Genre) => (
                  <p key={genre.id}>{genre.name}</p>
                ))}
              </div>
              <p>
                <span className="text-[#646464]">Tagline: </span>
                {currentMovie?.tagline}
              </p>
            </div>
          </div>
          <div className="similar-movies-container w-[100%] flex flex-col gap-4">
            <h1 className="font-semibold text-3xl">More Like This</h1>
            <div className="similar-movie-card-container flex flex-row flex-wrap gap-3">
              {" "}
              {similarMovies
                ? similarMovies.map((movie: Movie) => (
                    <SimilarMovieCard key={movie.id} movie={movie} />
                  ))
                : "No similar Movies"}
            </div>
          </div>
          <div className="about-movie w-[100%] pb-16 flex flex-col gap-5">
            <h1 className="text-2xl font-semibold">
              <span className="font-medium">About</span> {currentMovie?.title}
            </h1>
            <p>
              <span className="text-[#6e6e6e]">Popularity:</span>{" "}
              {currentMovie?.popularity}
            </p>
            <div>
              <span className="text-[#6e6e6e]">Production Companies: </span>
              <span className="flex flex-row flex-wrap gap-5">
                {currentMovie?.production_companies.map(
                  (company: ProductionCompany) => (
                    <p key={company.id}>{company.name}</p>
                  )
                )}
              </span>
            </div>
            <p className="flex flex-row gap-2">
              <span className="text-[#6e6e6e]">Tagline: </span>
              {currentMovie?.tagline}
            </p>
            <div className="genres-container flex flex-row flex-wrap gap-2">
              <span className="text-[#646464]">Genres: </span>
              {currentMovie?.genres.map((genre: Genre) => (
                <p key={genre.id}>{genre.name}</p>
              ))}
            </div>
            <p className="flex flex-row gap-2">
              <span className="text-[#6e6e6e]">Rating: </span>
              {currentMovie?.vote_average}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
