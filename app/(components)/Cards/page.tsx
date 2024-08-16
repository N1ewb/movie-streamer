import React from "react";
import Image from "next/image";
import { Category } from "@/lib/types";
import { showList } from "@/lib/global";

const filterShowsByCategory = (
  shows: Category[],
  category: string
): Category[] => {
  return shows.filter((show) => show.category === category);
};

const Romcom = filterShowsByCategory(showList, "RomCom");
const Drama = filterShowsByCategory(showList, "Drama");
const Action = filterShowsByCategory(showList, "Action");
const Comedy = filterShowsByCategory(showList, "Comedy");

const Cards = () => {
  return (
    <div className="flex flex-row gap-5 p-10 max-w-full overflow-auto scrollbar-hide">
      {Romcom && Romcom.length > 0 ? (
        Romcom.map((show, index) => (
          <div key={index} className="flex-shrink-0 w-[160px] text-center">
            <Image src={show.src} alt={show.name} height={160} width={160} />
            <p>{show.name}</p>
          </div>
        ))
      ) : (
        <p>No movies available</p>
      )}
    </div>
  );
};

export default Cards;
