import Image from "next/image";
import React, { useState } from "react";
import { Movie } from "@/lib/types";
import PlayMovieButton from "../Buttons/PlayMovieButton";
import MoreInfoButton from "../Buttons/MoreInfoButton";

interface ShowCardProps {
  show: Movie;
  type: "movie" | "tv";
  setSelectedShow: React.Dispatch<React.SetStateAction<Movie | undefined>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShowCards: React.FC<ShowCardProps> = ({
  show,
  type,
  setSelectedShow,
  setShowModal,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const PlayButtonClass =
    "bg-white py-1 pr-4 pl-2 rounded-[3px] text-black hover:bg-[#ffffffc0] flex flex-row gap-1 items-center md:[&_img]:w-[15px] md:[&_img]:h-[15px] md:text-[13px] sm:[&_img]:w-[11px] sm:[&_img]:h-[11px] sm:pr-2";
  const MoreInfoClass =
    "bg-[#7575757a] py-1 pr-4 pl-2 rounded-[3px] text-white hover:bg-[#75757544] flex flex-row gap-1 items-center md:[&_img]:w-[15px] md:[&_img]:h-[15px] md:text-[13px] sm:[&_img]:w-[11px] sm:[&_img]:h-[11px] sm:pr-2";

  const handleMoreInfoClick = () => {
    setSelectedShow(show);
    setShowModal(true);
  };

  return (
    <div
      className={`card-container text-white flex flex-col justify-center z-0 w-[300px] lg:w-[250px] md:w-[200px] sm:w-[175px] xsm:w-[150px]`}
    >
      <Image
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        src={
          show.backdrop_path
            ? `https://image.tmdb.org/t/p/original${show.backdrop_path}`
            : "/alya.png"
        }
        alt={`${
          show.original_title ? show.original_title : show.original_name
        } backdrop`}
        width={300}
        height={160}
        className={
          !isHovered
            ? "object-cover  opacity-[1]"
            : "object-cover  opacity-[0.8]  bg-neutral-700"
        }
        priority
      />
      {isHovered ? (
        <div
          className="absolute top-0 flex flex-col p-4 justify-between h-[100%] w-[100%] md:p-2"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <h1 className="font-semibold text-xl md:text-[15px] sm:text-[13px] xsm:text-[12px] leading-tight">
            {show.title ? show.title : show.name}
          </h1>
          <div className="buttons-container w-[100%] flex flex-row items-center justify-around font-semibold">
            <PlayMovieButton
              PlayButtonClass={PlayButtonClass}
              show={show}
              imgWidth={15}
              imgHeight={15}
              type={type}
              epNumber="1"
            />
            <MoreInfoButton
              onClick={() => handleMoreInfoClick()}
              MoreInfoButtonClass={MoreInfoClass}
              imgWidth={15}
              imgHeight={15}
            />
          </div>
          <div className="genre-container"></div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ShowCards;
