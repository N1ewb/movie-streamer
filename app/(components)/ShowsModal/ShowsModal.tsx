import {
  getMovieByID,
  getShowVideos,
  getSimilarMovie,
  getSimilarTV,
  getTVEpisodes,
  getTVSeriesDetails,
} from "@/lib/global";
import {
  Genre,
  Movie,
  MovieDetail,
  MovieVideo,
  ProductionCompany,
  TVEpisode,
  TVSeason,
  TVSeries,
} from "@/lib/types";
import { Volume2, VolumeX } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import PlayMovieButton from "../Buttons/PlayMovieButton";
import SimilarMovieCard from "../Cards/SimilarMovieCard";
import TVEpisodesCards from "../Cards/TVEpisodesCards";

interface ShowsModalProps {
  show: boolean;
  type: "movie" | "tv";
  onClose: () => void;
  movie: Movie;
}

const ShowsModal = ({ show, onClose, movie, type }: ShowsModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [movieVideos, setMovieVideos] = useState<MovieVideo[]>([]);
  const [TVSeasons, setTVSeasons] = useState<TVSeason | null>(null);
  const [episodeList, setEpisodeList] = useState<TVEpisode[]>([]);
  const [currentMovie, setMovie] = useState<MovieDetail>();
  const [currentTV, setTV] = useState<TVSeries>();
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isExtended, setIsExtended] = useState<boolean>(true);
  const [contentHeight, setContentHeight] = useState(0);

  const PlayButtonClass =
    "px-10 py-2 bg-white w-[20%] text-black rounded-[5px] text-2xl font-bold flex flex-row items-center gap-3 hover:bg-[#ffffffc0] xl:px-6 xl:py-3 xl:text-xl lg:text-[16px] lg:[&_img]:w-[25px] lg:[&_img]:h-[25px] md:[&_img]:w-[20px] md:[&_img]:h-[20px] md:w-[25%] xsm:px-4 xsm:w-[35%] xxsm:w-[40%] xxxxsm:w-[45%]";

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    if (movie) {
      setIsLoading(true);

      const fetchMovieData = async () => {
        try {
          const movieData = await getMovieByID(movie.id);
          const res = JSON.parse(movieData);
          setMovie(res);

          if (type === "movie") {
            const similarMoviesData = await getSimilarMovie(movie.id);
            const filteredSimilarData = similarMoviesData.filter(
              (movie: Movie) => movie.poster_path !== null
            );
            setSimilarMovies(filteredSimilarData);
          }
        } catch (error) {
          console.error("Error fetching movie data:", error);
        } finally {
          setIsLoading(false);
        }
      };

      const fetchTVData = async () => {
        try {
          if (type === "tv") {
            const tvData = await getTVSeriesDetails(movie.id);
            setTV(tvData);

            const similarTVData = await getSimilarTV(movie.id, 1);
            setSimilarMovies(similarTVData);
          }
        } catch (error) {
          console.error("Error fetching movie data:", error);
        } finally {
          setIsLoading(false);
        }
      };

      if (type === "movie") {
        fetchMovieData();
      } else if (type === "tv") {
        fetchTVData();
      } else {
        console.log("Invalid Type");
      }
    }
  }, [show, movie, type]);

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
            video.type.includes("Teaser") ||
            video.type.includes("Trailer") ||
            video.type.includes("Opening Credits")
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
    handleGetMovieVideo(movie.id, type);
  }, [movie.id, type, movie]);

  useEffect(() => {
    if (show && movie && type === "tv") {
      setIsLoading(true);

      const fetchData = async () => {
        try {
          const tvData = await getTVEpisodes(movie.id, 1);
          setTVSeasons(tvData);
          setEpisodeList(tvData.episodes);
        } catch (error) {
          console.error("Error fetching tv episodes data:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [show, type, movie]);

  useEffect(() => {
    if (show && modalRef.current && !isLoading) {
      modalRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [show, isLoading]);

  useEffect(() => {
    if (isExtended && buttonRef.current && !isLoading) {
      buttonRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isExtended, isLoading]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateContentHeight = () => {
        setContentHeight(document.documentElement.scrollHeight);
      };

      updateContentHeight();

      window.addEventListener("resize", updateContentHeight);

      return () => window.removeEventListener("resize", updateContentHeight);
    }
    if (contentHeight) {
      console.log("content height", contentHeight);
    }
  }, [contentHeight]);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show]);

  if (!show) return null;

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div
      className="absolute max-h-screen w-full left-0 bg-[#000000cc] bg-opacity-75 flex  justify-center pt-[50px] z-[99] rounded-[20px] overflow-auto"
      ref={modalRef}
    >
      <div className="modal-content-container  h-fit bg-[#141414] relative  w-[50%] 2xl:w-[70%] 1xl:w-[75%] lg:w-[80%] md:w-[90%]  min-h-screen shadow-lg  xsm:w-full rounded-md">
        <div className="modal-header w-[100%] flex flex-row-reverse absolute top-2 right-3 z-30">
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
          {movieVideos[0] ? (
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
          ) : (
            <div className="flex flex-col items-center justify-center">
              <h1>
                This TV show does not have anything, but is somehow popular
              </h1>
            </div>
          )}
          <button
            onClick={toggleMute}
            className="absolute bottom-[110px] right-[30px] bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity z-50 1xl:bottom-[%] 1xl:right-[100px] lg:bottom-[150px] md:bottom-[50px] md:right-[60px] sm:bottom-[30px] xsm:bottom-[10px]"
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </div>
        <div className="modal-content relative flex flex-col z-20 w-full h-[100%] bg-gradient-to-b via-[#1b1b1bd2] from-transparent pt-[40.25%] px-[50px] gap-7">
          <PlayMovieButton
            type={type}
            PlayButtonClass={PlayButtonClass}
            imgWidth={15}
            imgHeight={15}
            show={movie}
            epNumber={"1"}
          />
          <div className="div flex flex-row flex-wrap gap-4 w-[20%] md:w-[80%]">
            <p>
              {type === "movie"
                ? currentMovie?.release_date
                : currentTV?.first_air_date}
            </p>
            <p>
              {type === "movie"
                ? currentMovie?.runtime
                : currentTV?.episode_run_time}{" "}
              mins
            </p>
            <p>Language: {currentMovie?.original_language}</p>
          </div>
          <div className="div w-[100%] flex flex-row md:flex-col md:gap-5">
            <div className="div w-[70%] md:w-[90%]">
              <p>
                {type === "movie"
                  ? currentMovie?.overview
                  : currentTV?.overview}
              </p>
            </div>
            <div className="div w-[30%] md:w-full">
              <div className="genres-container flex flex-row flex-wrap gap-2 md:w-[90%]">
                <span className="text-[#646464]">Genres: </span>
                {type === "movie"
                  ? currentMovie?.genres.map((genre: Genre) => (
                      <p key={genre.id}>{genre.name}</p>
                    ))
                  : currentTV?.genres.map((genre: Genre) => (
                      <p key={genre.id}>{genre.name}</p>
                    ))}
              </div>
              <p>
                <span className="text-[#646464]">Tagline: </span>
                {type === "movie" ? currentMovie?.tagline : currentTV?.tagline}
              </p>
            </div>
          </div>

          {/* TV SHOW EPISODES */}
          {type === "tv" ? (
            <div className="tv-episodes-list-container cursor-pointer">
              <div className="tv-list-episodes-header border-b-[1px] border-solid border-[#585858] py-3 flex flex-row justify-between ">
                <h1 className="text-2xl font-semibold">Episodes</h1>
                <p>{currentTV?.name}</p>
              </div>
              <div
                ref={buttonRef}
                className={`tv-episode-list flex flex-col gap-4 py-6 ${
                  isExtended ? "max-h-[130vh] overflow-hidden" : ""
                }`}
              >
                {currentTV && episodeList.length !== 0 ? (
                  episodeList.map((episode: TVEpisode) => (
                    <TVEpisodesCards
                      key={episode.id}
                      episode={episode}
                      show={currentTV}
                    />
                  ))
                ) : (
                  <p>No Episodes Available</p>
                )}
              </div>
              {episodeList && episodeList.length > 9 ? (
                <div className="extend-button-container flex flex-row w-[100%] justify-center">
                  <button onClick={() => setIsExtended(!isExtended)}>
                    <Image
                      src={!isExtended ? "/up-arrow.png" : "/down-arrow.png"}
                      alt={!isExtended ? "up-arrow" : "down-arrow"}
                      height={25}
                      width={25}
                    />
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
          {/* TV SHOW EPISODES */}

          <div className="similar-shows-container w-[100%] flex flex-col gap-4">
            <h1 className="font-semibold text-3xl">More Like This</h1>

            <div className="similar-shows-card-container flex flex-row flex-wrap gap-3">
              {similarMovies
                ? similarMovies.map((movie: Movie) => (
                    <SimilarMovieCard key={movie.id} movie={movie} />
                  ))
                : "No similar Movies"}
            </div>
          </div>
          <div className="about-show w-[100%] pb-16 flex flex-col gap-5">
            <h1 className="text-2xl font-bold">
              <span className="font-medium text-xl">About</span>{" "}
              {type === "movie" ? currentMovie?.title : currentTV?.name}
            </h1>
            <p>
              <span className="text-[#6e6e6e]">Popularity:</span>{" "}
              {type === "movie"
                ? currentMovie?.popularity
                : currentTV?.popularity}
            </p>
            <div>
              <span className="text-[#6e6e6e]">Production Companies: </span>
              <span className="flex flex-row flex-wrap gap-5">
                {type === "movie"
                  ? currentMovie?.production_companies.map(
                      (company: ProductionCompany) => (
                        <p key={company.id}>{company.name}</p>
                      )
                    )
                  : currentTV?.production_companies.map(
                      (company: ProductionCompany) => (
                        <p key={company.id}>{company.name}</p>
                      )
                    )}
              </span>
            </div>
            <p className="flex flex-row gap-2">
              <span className="text-[#6e6e6e]">Tagline: </span>
              {type === "movie" ? currentMovie?.tagline : currentTV?.tagline}
            </p>
            <div className="genres-container flex flex-row flex-wrap gap-2">
              <span className="text-[#646464]">Genres: </span>
              {type === "movie"
                ? currentMovie?.genres.map((genre: Genre) => (
                    <p key={genre.id}>{genre.name}</p>
                  ))
                : currentTV?.genres.map((genre: Genre) => (
                    <p key={genre.id}>{genre.name}</p>
                  ))}
            </div>
            <p className="flex flex-row gap-2">
              <span className="text-[#6e6e6e]">Rating: </span>
              {type === "movie"
                ? currentMovie?.vote_average
                : currentTV?.vote_average}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowsModal;
