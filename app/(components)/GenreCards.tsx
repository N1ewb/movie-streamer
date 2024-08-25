import React from "react";
import Image from "next/image";
import { Movie } from "@/lib/types";

// import { showList } from "@/lib/temp";

// const filterShowsByCategory = (
//   shows: Category[],
//   category: string
// ): Category[] => {
//   return shows.filter((show) => show.category === category);
// };

// const Romcom = filterShowsByCategory(showList, "RomCom");
// const Drama = filterShowsByCategory(showList, "Drama");
// const Action = filterShowsByCategory(showList, "Action");
// const Comedy = filterShowsByCategory(showList, "Comedy");

interface MovieGenreProps {
  genre: any;
  movies: any;
}

const GenreCards: React.FC<MovieGenreProps> = ({ genre, movies }) => {
  return (
    <div className="flex flex-col text-white">
      <h1>{genre.name}</h1>
      <div className="romcom category-container flex flex-row gap-5 p-10 max-w-full overflow-auto scrollbar-hide">
        {movies && movies.length > 0 ? (
          movies.map((movie: Movie) => (
            <div
              key={movie.id}
              className="category-image flex-shrink-0 w-[160px] h-auto text-center"
            >
              <Image
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.original_title}
                width={160}
                height={500}
                style={{ height: "auto", width: "160px" }}
                className="object-cover"
              />
              <p>{movie.original_title}</p>
            </div>
          ))
        ) : (
          <p>No {genre.name} Movies available</p>
        )}
      </div>
    </div>
  );
};

export default GenreCards;
