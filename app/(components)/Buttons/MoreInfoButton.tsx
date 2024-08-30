import { Movie } from "@/lib/types";
import Image from "next/image";
import React from "react";

interface MoreInfoButtonProps {
  movie: Movie;
  MoreInfoButtonClass: string;
  imgWidth: number;
  imgHeight: number;
}

const MoreInfoButton = ({
  movie,
  MoreInfoButtonClass,
  imgWidth,
  imgHeight,
}: MoreInfoButtonProps) => {
  const handleClickMoreInfo = () => {};

  return (
    <button
      onClick={() => handleClickMoreInfo()}
      className={MoreInfoButtonClass}
    >
      <Image
        src="/info.png"
        alt="Play"
        width={imgHeight ? imgHeight : 25}
        height={imgWidth ? imgWidth : 25}
        className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
      />
      More options
    </button>
  );
};

export default MoreInfoButton;
