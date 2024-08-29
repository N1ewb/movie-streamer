import { getMovieVideos } from "@/lib/global";
import { Movie, MovieVideo } from "@/lib/types";
import React, { useEffect, useState } from "react";

interface TrailerCardProps {
  movie: Movie;
  setIsHovered: (arg0: boolean) => void;
}

const TrailerCard = ({ movie, setIsHovered }: TrailerCardProps) => {
  const [movieVideos, setMovieVideos] = useState<MovieVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
    return (
      <div className="trailer-card-container absolute top-0 h-[100%] w-[100%]">
        Loading trailer
      </div>
    );
  }

  return (
    <div
      className="trailer-card-container absolute"
      onMouseLeave={() => setIsHovered(false)}
    >
      <iframe
        width="360"
        height="215"
        src={`https://www.youtube.com/embed/${movieVideos[0].key}?si=97yzAPqUjH2tr5Rm`}
        title="YouTube video player"
        frameBorder="0"
        allow="autoplay; encrypted-media;"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>
      <div className="movie-details-container">
        <div className="div flex flex-row">
          <p>Play</p>
          <p>+</p>
          <p>Like</p>
        </div>
        <div className="div flex flex-row">
          <p>Age rating</p>
          <p>duration</p>
          <p>Quality</p>
        </div>
      </div>
    </div>
  );
};

export default TrailerCard;
