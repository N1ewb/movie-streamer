import Image from "next/image";
import React from "react";

const BrowsePage = () => {
  return (
    <div className="flex h-screen w-full text-white">
      <div className="browse-page-header flex flex-row justify-around relative items-center top-[100px] bg-[#323232]  w-full h-[100px]">
        <button className="flex flex-row items-center gap-2 ">
          Movies{" "}
          <Image
            src="/down-arrow-icon-no-circle.png"
            alt="down-arrow"
            height={15}
            width={15}
          />
        </button>
        <button className="flex flex-row items-center gap-2">
          TV Shows{" "}
          <Image
            src="/down-arrow-icon-no-circle.png"
            alt="down-arrow"
            height={15}
            width={15}
          />
        </button>
        <button className="flex flex-row items-center gap-2">
          By Rating{" "}
          <Image
            src="/down-arrow-icon-no-circle.png"
            alt="down-arrow"
            height={15}
            width={15}
          />
        </button>
        <button className="flex flex-row items-center gap-2">
          By Popularity{" "}
          <Image
            src="/down-arrow-icon-no-circle.png"
            alt="down-arrow"
            height={15}
            width={15}
          />
        </button>
        <button className="flex flex-row items-center gap-2">
          By Release Date{" "}
          <Image
            src="/down-arrow-icon-no-circle.png"
            alt="down-arrow"
            height={15}
            width={15}
          />
        </button>
      </div>
    </div>
  );
};

export default BrowsePage;
