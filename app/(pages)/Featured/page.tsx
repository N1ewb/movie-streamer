import React from "react";

import { featuredList } from "@/lib/temp";
import Image from "next/image";

const Features = () => {
  return (
    <div className="features-container absolute top-[800px] text-white w-full flex flex-col gap-10 p-10 z-20">
      <header>
        <h1 className="font-bold text-[35px]">Featured</h1>
        <p className="text-[#C7C7C7]">Shows for you</p>
      </header>
      <div className="featured-image-container flex flex-row  gap-5  overflow-auto max-w-full scrollbar-hide">
        {featuredList && featuredList.length !== 0 ? (
          featuredList.map((show, index) => (
            <div
              key={index}
              className="featured-images flex-shrink-0 w-[200px] items-center text-center"
            >
              <Image src={show.src} alt={show.name} height={200} width={200} />
              <p className="">{show.name}</p>
            </div>
          ))
        ) : (
          <p>No movies</p>
        )}
      </div>
    </div>
  );
};

export default Features;
