"use client";
import React, { useEffect, useState } from "react";

import { heroMovies } from "@/lib/global";
import Image from "next/image";

interface Movie {
  name: string;
  src: string;
}

const Hero = () => {
  const [active, setActive] = useState<Movie | null>(heroMovies[0]);
  const [activeNumber, setActiveNumber] = useState(0);

  const handleClickRight = () => {
    if (activeNumber >= heroMovies.length - 1) {
      setActiveNumber(0);
      setActive(heroMovies[activeNumber]);
    } else {
      setActiveNumber(activeNumber + 1);
      setActive(heroMovies[activeNumber]);
    }
    console.log(activeNumber);
  };
  const handleClickLeft = () => {
    if (activeNumber <= 0) {
      setActiveNumber(heroMovies.length - 1);
      setActive(heroMovies[activeNumber]);
    } else {
      setActiveNumber(activeNumber - 1);
      setActive(heroMovies[activeNumber]);
    }
    console.log(activeNumber);
  };

  return (
    <div className="landing-page-container text-white flex flex-row items-center">
      <div className="absolute w-[30%] h-[100vh] text-center">
        <h1 className="font-bold text-[45px]">{active && active.name}</h1>
        <p className="mobile-max:hidden truncate">
          {active && active.synopsis}
        </p>
      </div>
      <div className="">
        <button
          className="absolute top-[50%] left-10"
          onClick={() => handleClickLeft()}
        >
          Left
        </button>
        <div className="movie-card w-[100%]">
          <Image
            src={(active && active.src) || heroMovies[0].src}
            alt="Movie Image"
            width={0}
            height={0}
            objectFit="cover"
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <button
          className="absolute top-[50%] right-10"
          onClick={() => handleClickRight()}
        >
          Right
        </button>
      </div>
      <div className="div"></div>
    </div>
  );
};

export default Hero;
