import { TVSeries } from "@/lib/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface SimilarTVCardProps {
  tv: TVSeries;
}

const SimilarTVCard: React.FC<SimilarTVCardProps> = ({ tv }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleClickPlayMovie = () => {
    if (tv?.id) {
      router.push(`/PlayTV?id=${encodeURIComponent(tv.id.toString())}`);
    } else {
      console.error("Movie ID is not defined.");
    }
  };

  return (
    <div
      className="relative text-white w-[160px] md:w-[140px] flex flex-col items-center justify-start gap-2 p-2 bg-[#141414] rounded-md shadow-lg transition-transform hover:scale-105 hover:bg-opacity-80"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {tv.poster_path ? (
        <div className="relative w-full cursor-pointer">
          <Image
            onClick={handleClickPlayMovie}
            className="object-cover rounded-md transition-all duration-300 ease-in-out transform hover:opacity-75"
            src={`https://image.tmdb.org/t/p/original${tv.poster_path}`}
            alt={tv?.name || "movie poster"}
            width={160}
            height={240}
          />
          {isHovered && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                onClick={handleClickPlayMovie}
                src="/play-button-orange.png"
                alt="play"
                height={40}
                width={40}
                className="transition-transform transform hover:scale-110"
              />
            </div>
          )}
        </div>
      ) : (
        <div className="w-full h-[240px] flex items-center justify-center bg-gray-700 rounded-md">
          <p className="text-sm text-gray-400">No Image Available</p>
        </div>
      )}
      <p className="text-sm truncate w-full">{tv.name}</p>
    </div>
  );
};

export default SimilarTVCard;
