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
        style={{ height: "auto", width: "auto" }}
      />
      More options
    </button>
  );
};

export default MoreInfoButton;
