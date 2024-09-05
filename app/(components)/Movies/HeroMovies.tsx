import { getShowVideos } from "@/lib/global";
import { Movie, MovieVideo } from "@/lib/types";
import React, { useEffect, useState } from "react";
import { VolumeX, Volume2 } from "lucide-react";
import Image from "next/image";
import PlayMovieButton from "../Buttons/PlayMovieButton";
import MoreInfoButton from "../Buttons/MoreInfoButton";
import MovieModal from "../ShowsModal/ShowsModal";

interface HeroMoviesProps {
  movie: Movie;
}

const HeroMovies = ({ movie }: HeroMoviesProps) => {
  const [movieVideos, setMovieVideos] = useState<MovieVideo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);

  const PlayButtonClass =
    "px-8 py-4 bg-white text-black rounded-[7px] text-2xl font-bold flex flex-row items-center gap-1 hover:bg-[#ffffffc0] xl:px-6 xl:py-3 xl:text-xl lg:text-[13px] lg:[&_img]:w-[20px] lg:[&_img]:h-[20px] lg:py-1  sm:[&_img]:w-[15px] sm:[&_img]:h-[15px] sm:py-0";
  const MoreInfoButtonClass =
    "px-8 py-4 bg-[#7575757a] text-white rounded-[7px] text-2xl font-semibold flex flex-row items-center gap-1 hover:bg-[#75757544]  xl:px-6 xl:py-3 xl:text:xl lg:text-[13px] lg:[&_img]:w-[20px] lg:[&_img]:h-[20px] lg:py-1 sm:[&_img]:w-[15px] sm:[&_img]:h-[15px] sm:py-0";

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleMoreInfoClick = () => {
    setShowModal(true);
    console.log("clicked");
  };

  useEffect(() => {
    const handleGetMovieVideo = async (
      movieID: number,
      type: "movie" | "tv"
    ) => {
      setIsLoading(true);
      console.log(movie.id);
      try {
        const movieVideos = await getShowVideos(movieID, type);
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
    handleGetMovieVideo(movie.id, "movie");
  }, [movie.id]);

  if (isLoading) {
    return <div className="div">Loading</div>;
  }

  return (
    <div className=" h-[100%] w-full xl:h-[80%] xsm:absolute flex ">
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "0",
          paddingBottom: "56.25%",
        }}
        className=""
      >
        <iframe
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
          src={`https://www.youtube.com/embed/${
            movieVideos[0].key
          }?autoplay=1&controls=0&disablekb=1&fs=0&modestbranding=1&rel=0&loop=1&playlist=${
            movieVideos[0].key
          }&showinfo=0&mute=${isMuted ? 1 : 0}`}
          title="YouTube video player"
          frameBorder="0"
          allow="autoplay"
          className="bg-gradient-to-t from-[#020202]"
        ></iframe>
        <button
          onClick={toggleMute}
          className="absolute bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity z-40 bottom-[30%] right-[10%]"
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
      </div>
      <div className="hero-movie-details-container w-full flex flex-col z-20 gap-10 mt-[18%] mb-[1%] px-10 md:gap-5 xsm:gap-1 xsm:mt-[16%]">
        <div className="hero-movie-title flex flex-col xsm:p-3 r w-[50%] lg:w-[80%] xsm:w-[100%] ">
          <h1 className="font-extrabold w-[50%] text-8xl 2xl:text-7xl xl:text-6xl lg:text-5xl md:text-[36px] sm:text-[30px] xsm:text-[27px] xxsm:text-[23px] xxxsm:text-[19px]">
            {movie.original_title}
          </h1>
          <p className="xl:text-[14px]  flex flex-row xsm:w-[100%]">
            <span className=" block text-wrap lg:hidden">{movie.overview}</span>
            <span className="md:block hidden">
              {movie.genre_ids.map((genre: any) => genre.id)}
            </span>
          </p>
        </div>
        <div className="hero-movie-play-details flex flex-row gap-5">
          <PlayMovieButton
            type="movie"
            show={movie}
            PlayButtonClass={PlayButtonClass}
            imgWidth={25}
            imgHeight={25}
            epNumber="1"
          />
          <MoreInfoButton
            onClick={() => handleMoreInfoClick()}
            MoreInfoButtonClass={MoreInfoButtonClass}
            imgWidth={25}
            imgHeight={25}
          />
        </div>
      </div>
      <MovieModal
        type="movie"
        show={showModal}
        onClose={() => setShowModal(false)}
        movie={movie}
      />
    </div>
  );
};

export default HeroMovies;
