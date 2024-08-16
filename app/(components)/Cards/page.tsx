import React from "react";
import Image from "next/image"; // Ensure this import if you are using Next.js

interface Categories {
  name: string;
  src: string;
  category: string;
  synopsis: string;
}

interface MovieCardProps {
  Category: Categories[];
}

const MovieCard: React.FC<MovieCardProps> = ({ Category }) => {
  return (
    <div className="flex flex-row gap-5 p-10 max-w-full overflow-auto scrollbar-hide">
      {Category && Category.length > 0 ? (
        Category.map((show, index) => (
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

export default MovieCard;
