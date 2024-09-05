import { Movie } from "@/lib/types";
import Image from "next/image";

import React from "react";

interface MoreInfoButtonProps {
  MoreInfoButtonClass: string;
  imgWidth: number;
  imgHeight: number;

  onClick: () => void;
}

const MoreInfoButton = ({
  MoreInfoButtonClass,
  imgWidth,
  imgHeight,

  onClick,
}: MoreInfoButtonProps) => {
  return (
    <button onClick={onClick} className={MoreInfoButtonClass}>
      <Image
        src="/info.png"
        alt="Play"
        width={imgHeight ? imgHeight : 25}
        height={imgWidth ? imgWidth : 25}
        className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
      />
      More<span className="sm:hidden"> </span>Info
    </button>
  );
};

export default MoreInfoButton;
