import { getMovieVideos } from "@/lib/global";
import { Movie, MovieVideo } from "@/lib/types";
import React, { useEffect, useState } from "react";
import { VolumeX, Volume2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface HeroMoviesProps {
  movie: Movie;
}

const HeroMovies = ({ movie }: HeroMoviesProps) => {
  const router = useRouter();
  const [movieVideos, setMovieVideos] = useState<MovieVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleClickPlayMovie = () => {
    if (movie?.id) {
      router.push(`/PlayMovie?id=${encodeURIComponent(movie.id.toString())}`);
    } else {
      console.error("Movie ID is not defined.");
    }
  };

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
  }, []);

  if (isLoading) {
    return <div className="div">Loading</div>;
  }

  return (
    <div className="absolute h-[100vh] w-full">
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "0",
          paddingBottom: "56.25%",
        }}
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
          className="absolute bottom-[280px] right-[120px] bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity z-50"
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
      </div>
      <div className="hero-movie-detials-container flex flex-col absolute z-50 top-[20%] left-10 w-[40%] h-[50%] justify-evenly">
        <div className="hero-movie-title flex flex-col">
          <h1 className="font-extrabold text-8xl">{movie.original_title}</h1>
          <p>{movie.overview}</p>
        </div>
        <div className="hero-movie-play-details flex flex-row w-[55%] justify-between">
          <button
            onClick={() => handleClickPlayMovie()}
            className="px-8 py-4 bg-white text-black rounded-[7px] text-2xl font-bold flex flex-row items-center gap-1 hover:bg-[#ffffffc0]"
          >
            <Image
              src="/play-button-arrowhead.png"
              alt="Play"
              width={25}
              height={25}
              style={{ height: "auto", width: "auto" }}
            />
            Play
          </button>
          <button className="px-8 py-4 bg-[#7575757a] text-white rounded-[7px] text-2xl font-semibold flex flex-row items-center gap-1 hover:bg-[#75757544]">
            <Image
              src="/info.png"
              alt="Play"
              width={25}
              height={25}
              style={{ height: "auto", width: "auto" }}
            />
            More options
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroMovies;
