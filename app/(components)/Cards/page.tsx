import React from "react";
import Image from "next/image";
import { Category } from "@/lib/types";

interface MovieCardProps {
  categories: Category[];
}

const Cards: React.FC<MovieCardProps> = ({ categories }) => {
  return (
    <div className="flex flex-row gap-5 p-10 max-w-full overflow-auto scrollbar-hide">
      {categories && categories.length > 0 ? (
        categories.map((show, index) => (
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
