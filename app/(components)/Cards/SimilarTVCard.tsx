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
      router.push(`/PlayTVPage?id=${encodeURIComponent(tv.id.toString())}`);
    } else {
      console.error("TV Series ID is not defined.");
    }
  };

  return (
    <div
      className="relative text-white w-[160px] md:w-[180px] lg:w-[200px] xl:w-[220px] flex flex-col items-center justify-start gap-2 p-2 bg-[#141414] rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-opacity-80"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {tv.poster_path ? (
        <div className="relative w-full cursor-pointer overflow-hidden rounded-lg">
          <Image
            onClick={handleClickPlayMovie}
            className="object-cover rounded-lg transition-transform duration-500 ease-in-out transform hover:scale-110"
            src={`https://image.tmdb.org/t/p/original${tv.poster_path}`}
            alt={tv?.name || "TV series poster"}
            width={200}
            height={300}
          />
          {isHovered && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <Image
                onClick={handleClickPlayMovie}
                src="/play-button-orange.png"
                alt="play"
                height={50}
                width={50}
                className="transition-transform transform hover:scale-125"
              />
            </div>
          )}
        </div>
      ) : (
        <div className="w-full h-[auto] flex items-center justify-center bg-gray-700 rounded-lg ">
          <p className="text-sm text-gray-400">No Image Available</p>
        </div>
      )}
      <p className="text-sm md:text-base lg:text-lg font-semibold truncate w-full text-center">
        {tv.name}
      </p>
    </div>
  );
};

export default SimilarTVCard;
