"use client";
import React, { useEffect, useState } from "react";

import { heroMovies } from "@/lib/global";
import Image from "next/image";

interface Movie {
  name: string;
  src: string;
  synopsis: string;
  altSrc: string;
}

const Hero = () => {
  const [active, setActive] = useState<Movie | null>(heroMovies[0]);
  const [activeNumber, setActiveNumber] = useState(0);

  const handleClickRight = () => {
    setActiveNumber((prevNumber) => {
      const newNumber =
        prevNumber >= heroMovies.length - 1 ? 0 : prevNumber + 1;
      setActive(heroMovies[newNumber]);
      return newNumber;
    });
  };

  const handleClickLeft = () => {
    setActiveNumber((prevNumber) => {
      const newNumber =
        prevNumber <= 0 ? heroMovies.length - 1 : prevNumber - 1;
      setActive(heroMovies[newNumber]);
      return newNumber;
    });
  };

  return (
    <div className="landing-page-container text-white flex flex-row items-center h-[100vh] w-full">
      <div className="anime-info-container absolute top-0  w-[100%] flex flex-col h-[100%] text-center justify-center bg-gradient-to-r from-black black ... z-10 ">
        <div className="anime-info relative w-[50%] p-[100px] flex flex-col justify-center items-center align-middle gap-10  ">
          <h1 className="font-bold text-[45px] ">{active && active.name}</h1>
          <p className="w-[100%] h-[20%] text-clip overflow-hidden text-[#C7C7C7]  ">
            {active && active.synopsis}
          </p>
          <button className="bg-[#F78B24] px-10 py-4 w-[40%] flex flex-row text-center gap-5  justify-center ]">
            <Image src="/play-button.png" alt="play" height={25} width={25} />
            Start Watching
          </button>
        </div>
      </div>
      <div className="anime-image-container">
        <button
          className="absolute top-[50%] left-10 z-10"
          onClick={() => handleClickLeft()}
        >
          <Image
            src="/left-arrow.png"
            alt="left-arrow"
            height={25}
            width={25}
          />
        </button>
        <div className="movie-card w-[100%] z-0">
          <Image
            src={(active && active.src) || heroMovies[0].src}
            alt="Movie Image"
            objectFit="cover"
            fill
            objectPosition="top"
            className="large-screen-image"
          />
          <Image
            src={(active && active.altSrc) || heroMovies[0].altSrc}
            alt="Movie Image"
            objectFit="cover"
            fill
            objectPosition="top"
            className="small-screen-image"
          />
        </div>
        <button
          className="absolute top-[50%] right-10 z-10"
          onClick={() => handleClickRight()}
        >
          <Image
            className="z-20"
            src="/right-arrow.png"
            alt="left-arrow"
            width={25}
            height={25}
          />
        </button>
      </div>
      <div className="div"></div>
    </div>
  );
};

export default Hero;
