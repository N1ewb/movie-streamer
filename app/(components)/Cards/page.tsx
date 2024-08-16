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
    <div className="flex flex-col ">
      <h1>Rom Com</h1>
      <div className="romcom-container flex flex-row gap-5 p-10 max-w-full overflow-auto scrollbar-hide">
        {Romcom && Romcom.length > 0 ? (
          Romcom.map((show, index) => (
            <div key={index} className="flex-shrink-0 w-[160px] text-center">
              <Image src={show.src} alt={show.name} height={160} width={160} />
              <p>{show.name}</p>
            </div>
          ))
        ) : (
          <p>No Rom Com Movies available</p>
        )}
      </div>
      <h1>Drama</h1>
      <div className="drama-container flex flex-row gap-5 p-10 max-w-full overflow-auto scrollbar-hide">
        {Drama && Drama.length > 0 ? (
          Drama.map((show, index) => (
            <div key={index} className="flex-shrink-0 w-[160px] text-center">
              <Image src={show.src} alt={show.name} height={160} width={160} />
              <p>{show.name}</p>
            </div>
          ))
        ) : (
          <p>No Drama Movies available</p>
        )}
      </div>
      <h1>Action</h1>
      <div className="action-container flex flex-row gap-5 p-10 max-w-full overflow-auto scrollbar-hide">
        {Action && Action.length > 0 ? (
          Action.map((show, index) => (
            <div key={index} className="flex-shrink-0 w-[160px] text-center">
              <Image src={show.src} alt={show.name} height={160} width={160} />
              <p>{show.name}</p>
            </div>
          ))
        ) : (
          <p>No Action Movies available</p>
        )}
      </div>
      <h1>Comedy</h1>
      <div className="comedy-container flex flex-row gap-5 p-10 max-w-full overflow-auto scrollbar-hide">
        {Comedy && Comedy.length > 0 ? (
          Comedy.map((show, index) => (
            <div key={index} className="flex-shrink-0 w-[160px] text-center">
              <Image src={show.src} alt={show.name} height={160} width={160} />
              <p>{show.name}</p>
            </div>
          ))
        ) : (
          <p>No Comedy Movies available</p>
        )}
      </div>
    </div>
  );
};

export default Cards;
