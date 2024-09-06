"use client";

import { getSimilarTV, getTVEpisodes, getTVSeriesDetails } from "@/lib/global";
import { Movie, TVEpisode, TVSeason, TVSeries } from "@/lib/types";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import SimilarMovieCard from "../Cards/SimilarMovieCard";
import SimilarTVCard from "../Cards/SimilarTVCard";
// import SimilarMovieCard from "../Cards/SimilarMovieCard";

const PlayTV = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const ep = searchParams.get("ep");
  const router = useRouter();
  const [videoURL, setVideoUrl] = useState<string>();
  const [tv, setTV] = useState<TVSeries>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [similarTV, setSimilarTV] = useState<Movie[]>([]);
  const movieListRef = useRef<HTMLDivElement>(null);
  const [tvEpisodes, setTVEpisodes] = useState<TVSeason | null>(null);
  const [episodeList, setEpisodeList] = useState<TVEpisode[]>([]);
  const [screenSize, setScreenSize] = useState({
    width: 0,
    height: 0,
  });

  const handleNextEpisode = () => {
    if (id && ep) {
      const newEp = parseInt(ep) + 1;
      router.push(
        `/PlayTVPage?id=${encodeURIComponent(
          id.toString()
        )}&ep=${encodeURIComponent(newEp.toString())}`
      );
    }
  };

  const handlePrevEpisode = () => {
    if (id && ep) {
      const newEp = parseInt(ep) - 1;
      router.push(
        `/PlayTVPage?id=${encodeURIComponent(
          id.toString()
        )}&ep=${encodeURIComponent(newEp.toString())}`
      );
    }
  };

  const handleJumpToEpisode = (jumpTo: number) => {
    if (id && ep) {
      router.push(
        `/PlayTVPage?id=${encodeURIComponent(
          id.toString()
        )}&ep=${encodeURIComponent(jumpTo.toString())}`
      );
    }
  };

  const handleSlideContainer = (direction: "left" | "right") => {
    if (movieListRef.current) {
      const scrollAmount = screenSize.width * 0.27;
      movieListRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      const updateScreenSize = () => {
        setScreenSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener("resize", updateScreenSize);
      return () => window.removeEventListener("resize", updateScreenSize);
    }
  }, []);

  useEffect(() => {
    if (id) {
      const tvID = parseInt(id);
      console.log("Tv Series ID: ", id);
      setIsLoading(true);

      const fetchData = async () => {
        try {
          const movieData = await getTVSeriesDetails(tvID);
          setTV(movieData);
          console.log("Movie data: ", movieData);
          const similarTVData = await getSimilarTV(tvID, 1);

          setSimilarTV(similarTVData);
        } catch (error) {
          console.error("Error fetching movie data:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [id, ep]);

  useEffect(() => {
    if (id && ep) {
      // const URLVidSrc = `https://vidsrc.xyz/embed/movie?tmdb=${id}&sub_url=https%3A%2F%2Fvidsrc.me%2Fsample.srt`;
      const URLStreamBucket = `https://multiembed.mov/?video_id=${id}&tmdb=1&s=1&e=${ep}`;
      setVideoUrl(URLStreamBucket);
    }
  }, [id, ep]);

  useEffect(() => {
    if (id && tv) {
      setIsLoading(true);

      const fetchData = async () => {
        try {
          const tvData = await getTVEpisodes(tv.id, 1);
          setTVEpisodes(tvData);
          setEpisodeList(tvData.episodes);
        } catch (error) {
          console.error("Error fetching tv episodes data:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [id, tv, ep]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="play-movie-page-container min-h-screen w-full text-white flex flex-col items-center pt-32 font-Roboto">
      <div className="movie-player-container w-full h-100% flex justify-center items-center ">
        <iframe
          className="w-[80%] h-[80vh] rounded-[3px] border-solid border-2 border-[#323232] lg:h-[70vh] md:h-[60vh] sm:h-[50vh]"
          src={videoURL}
          title={tv?.original_name}
          frameBorder="0"
          allowFullScreen
          allow="autoplay; encrypted-media; "
        ></iframe>
      </div>
      <div className="prev-next-episode-button flex flex-row w-[80%] justify-between py-4 xsm:[&_button]:px-8 xxsm:[&_button]:px-6 xxxsm:[&_button]:px-4">
        {ep && parseInt(ep) !== 1 ? (
          <button
            onClick={() => handlePrevEpisode()}
            className="py-3 px-10 bg-[#323232] hover:-translate-x-3 transition-all ease-in-out duration-400 rounded-[3px]"
          >
            <span>Prev Episode</span>
          </button>
        ) : (
          <p></p>
        )}
        {ep && parseInt(ep) !== episodeList.length ? (
          <button
            onClick={() => handleNextEpisode()}
            className="py-3 px-10 bg-[#323232] hover:translate-x-3 transition-all ease-in-out duration-400 rounded-[3px]"
          >
            <span>Next Episode</span>
          </button>
        ) : (
          <p></p>
        )}
      </div>
      <div className="tv-episode-list-container w-[80%] flex flex-row flex-wrap justify-center gap-2 p-7 lg:p-1 lg:text-[14px]">
        {tv && episodeList.length !== 0
          ? episodeList.map((episode: TVEpisode) => (
              <div
                key={episode.id}
                onClick={() => handleJumpToEpisode(episode.episode_number)}
                className={`episode-list-container cursor-pointer w-[100px] p-4  rounded-[3px] group  ${
                  ep && parseInt(ep) === episode.episode_number
                    ? "bg-[#e4e4e4] text-black"
                    : "bg-[#323232] text-white"
                }`}
              >
                <p className=" group-hover:translate-x-3 font-medium  group-hover:font-bold  transition-all ease-in-out duration-400  h-[100%] w-[100%] m-0">
                  {episode.episode_number}{" "}
                  <span className="text-[#6b6b6b] text-xs">| Ep</span>
                </p>
              </div>
            ))
          : "No episodes"}
      </div>
      <div className="play-tv-bottom-content w-[80%] pt-8 pb-80 flex flex-row justify-between lg:flex-col">
        <div className="more-tv-details flex flex-row w-[60%] border-solid border-2 border-[#2f3031] bg-[#0f0f0f] p-3 justify-between rounded-[3px] lg:w-[100%] lg:gap-2 md:flex-col">
          <div className="left-detail w-[30%] md:w-[100%] md:flex md:justify-center">
            <Image
              src={
                tv?.poster_path !== undefined
                  ? `https://image.tmdb.org/t/p/original/${tv?.poster_path}`
                  : "/movie-cover/alya.jpg"
              }
              alt={tv?.original_name || "tv photobg"}
              height={400}
              width={196}
            />
          </div>
          <div className="right-detail w-[70%] flex flex-col gap-3 md:w-[100%] ">
            <h1 className="text-3xl font-bold font-Roboto md:text-center">
              {tv?.name}
            </h1>
            <p className="flex flex-row gap-4 font-Roboto">
              <span className="font-Roboto">{tv?.vote_average}</span>{" "}
              <span className="text-[#ffffff8f]">out of</span>{" "}
              <span className="font-Roboto">{tv?.vote_count}</span>{" "}
              <span className="font-Roboto">
                <span className="text-[#ffffff8f]">Release date: </span>
                {tv?.first_air_date}
              </span>
            </p>
            <div className="tv-genres-list flex flex-row flex-wrap gap-4">
              <p className="text-[#ffffff8f]">Genres:</p>
              {tv && tv.genres.length !== 0
                ? tv.genres.map((genre) => <p key={genre.id}>{genre.name}</p>)
                : "No Genres"}
            </div>
            <p className="text-[#ffffff8f]">Overview:</p>
            <p className="font-Roboto text-[16px]">{tv?.overview}</p>
            <p className="flex flex-row gap-4">
              <span className="font-Roboto">
                <span className="text-[#ffffff8f]"> Status:</span> {tv?.status}
              </span>{" "}
              <span className="font-Roboto">
                {" "}
                <span className="text-[#ffffff8f]"> Tagline:</span>{" "}
                {tv?.tagline}
              </span>
            </p>
          </div>
        </div>
        <div className="similar-tv-container w-[40%] px-5 py-2 lg:w-[100%] md:px-1">
          <h1 className="font-semibold text-1xl">Related TV Shows {">>"}</h1>
          <div className="similar-tv flex flex-row overflow-auto w-[100%] scrollbar-hide gap-3">
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
              {similarTV && similarTV.length !== 0 ? (
                similarTV.map((tv: Movie) => (
                  <div key={tv.id} className="">
                    {" "}
                    <SimilarMovieCard movie={tv} />
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

export default PlayTV;
