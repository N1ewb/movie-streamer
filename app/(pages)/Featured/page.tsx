import React from "react";

import { showList } from "@/lib/global";
import Image from "next/image";

const Features = () => {
  return (
    <div className="text-white w-full p-10">
      <h1 className="font-bold text-[35px]">Featured</h1>
      <p className="text-[]">Shows for you</p>
      <div className="flex flex-row gap-5 mobile-max:min-w-[600px] overflow-auto">
        {showList && showList.length !== 0 ? (
          showList.map((show, index) => (
            <div
              key={index}
              className="w-[200px] text-center mobile-max:min-w-[200px]"
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
