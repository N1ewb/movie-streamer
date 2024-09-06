"use client";
import React, { useEffect } from "react";
import { Movie } from "@/lib/types";
import Image from "next/image";
import ShowsCards from "../Cards/ShowCards";

interface TvListShowProps {
  handleSlideContainer: (direction: "left" | "right") => void;
  tvListRef: React.RefObject<HTMLDivElement>;
  section: any;
  tvList: Movie[];
  setSelectedTV: React.Dispatch<React.SetStateAction<Movie | undefined>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const TvShowList = ({
  handleSlideContainer,
  tvListRef,
  section,
  tvList,
  setSelectedTV,
  setShowModal,
}: TvListShowProps) => {
  useEffect(() => {
    section.fetch();
  }, []);

  return (
    <div className="tv-list-container px-[45px] max-w-full text-white z-20  flex flex-col lg:px-[35px] md:px-[25px]">
      <div className="tv-list-header">
        <h1 className="font-semibold text-3xl lg:text-[25px] md:text-xl text-[#d4d4d4] sm:text-[16px] xsm:text-sm">
          {section.header}
        </h1>
      </div>
      <div className="tv-content-container relative py-2 flex flex-row items-center justify-between w-full">
        <button
          className="cursor-pointer absolute h-[100%] left-0 top-0 px-1 z-50 bg-[#00000098]"
          onClick={() => handleSlideContainer("left")}
        >
          <Image
            className="hover:-translate-x-1 transition-transform duration-300"
            src="/left-arrow.png"
            alt="left"
            width={15}
            height={15}
            style={{ height: "auto", width: "auto" }}
          />
        </button>
        <div
          className="tv-list-container flex flex-row w-full gap-3 overflow-auto scrollbar-hide"
          ref={tvListRef}
        >
          {tvList.map((tv: Movie) => (
            <div key={tv.id} className="flex tv-card-container">
              <ShowsCards
                type="tv"
                show={tv}
                setSelectedShow={setSelectedTV}
                setShowModal={setShowModal}
              />
            </div>
          ))}
        </div>
        <button
          className="cursor-pointer absolute h-[100%] right-0 top-0 px-1 bg-[#00000098] "
          onClick={() => handleSlideContainer("right")}
        >
          <Image
            className="hover:translate-x-1 transition-transform duration-300"
            src="/right-arrow.png"
            alt="right"
            width={15}
            height={15}
            style={{ height: "auto", width: "auto" }}
          />
        </button>
      </div>
    </div>
  );
};

export default TvShowList;
