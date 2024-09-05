import { TVEpisode, TVSeries } from "@/lib/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface TVEpisodesCardsProps {
  episode: TVEpisode;
  show: TVSeries;
}

const TVEpisodesCards = ({ episode, show }: TVEpisodesCardsProps) => {
  const router = useRouter();

  const handleWatchEpisode = () => {
    router.push(
      `/PlayTVPage?id=${encodeURIComponent(
        show.id.toString()
      )}&ep=${encodeURIComponent(episode.episode_number.toString())}`
    );
  };

  return (
    <div
      onClick={() => handleWatchEpisode()}
      className="tv-episode-card flex flex-row justify-between items-center w-[10%%] border-b-[1px] border-solid border-[#585858] pb-3 gap-3"
    >
      <h1>{episode.episode_number}</h1>
      <Image
        className="md:w-[150px] h-[auto] rounded-sm xxsm:w-[100px]"
        src={
          episode.still_path
            ? `https://image.tmdb.org/t/p/original${episode.still_path}`
            : "/alya.png"
        }
        alt={`${episode.episode_number}`}
        height={200}
        width={200}
      />
      <p className="w-[50%] text-wrap">{episode.name}</p>
      <p>{episode.runtime} mins</p>
    </div>
  );
};

export default TVEpisodesCards;
