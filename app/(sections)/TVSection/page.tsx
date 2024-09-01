"use client";
import React, { useEffect, useRef, useState } from "react";
import { getAiringTodayTV, getPopularTV, getTopRatedTV } from "@/lib/global";
import { Movie } from "@/lib/types";
import MovieModal from "@/app/(components)/ShowsModal/MovieModal";
import TvShowList from "@/app/(components)/TVShows/TVShowList";

const TVSection: React.FC = () => {
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const [popularTV, setPopularTV] = useState<Movie[]>([]);
  const [topRatedTV, setTopRatedTV] = useState<Movie[]>([]);
  const [airingNowTV, setAiringNowTV] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie>();
  const [showModal, setShowModal] = useState<boolean>(false);

  const fetchTV = async (
    fetcher: (page: number) => Promise<Movie[]>,
    setTV: React.Dispatch<React.SetStateAction<Movie[]>>,
    page: number = 1
  ) => {
    try {
      const TV = await fetcher(page);
      setTV(TV);
    } catch (error) {
      console.error(
        "Error fetching TV:",
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  };

  const TVSections = [
    {
      header: "Popular Movies",
      fetch: () => fetchTV(getPopularTV, setPopularTV),
      TV: popularTV,
      tvListRef: useRef<HTMLDivElement>(null),
    },
    {
      header: "Top Rated TV",
      fetch: () => fetchTV(getTopRatedTV, setTopRatedTV),
      TV: topRatedTV,
      tvListRef: useRef<HTMLDivElement>(null),
    },
    {
      header: "Airing Now TV",
      fetch: () => fetchTV(getAiringTodayTV, setAiringNowTV),
      TV: airingNowTV,
      tvListRef: useRef<HTMLDivElement>(null),
    },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateScreenSize = () => {
        setScreenSize({ width: window.innerWidth, height: window.innerHeight });
      };

      updateScreenSize();
      window.addEventListener("resize", updateScreenSize);
      return () => window.removeEventListener("resize", updateScreenSize);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-between max-w-full md:top-72 sm:top-80 xsm:top-36  xxsm:top-10 xxxxsm:top-40 text-white">
      {TVSections.map((section, index) => (
        <div key={index} className="flex movie-list-page-container max-w-full">
          <TvShowList
            handleSlideContainer={(direction) =>
              section.tvListRef.current &&
              section.tvListRef.current.scrollBy({
                left:
                  direction === "left"
                    ? -(screenSize.width - screenSize.width / 5.3)
                    : screenSize.width - screenSize.width / 5.3,
                behavior: "smooth",
              })
            }
            tvListRef={section.tvListRef}
            section={section}
            tvList={section.TV}
            setSelectedTV={setSelectedMovie}
            setShowModal={setShowModal}
          />
        </div>
      ))}
      {selectedMovie && (
        <MovieModal
          type="tv"
          show={showModal}
          onClose={() => setShowModal(false)}
          movie={selectedMovie}
        />
      )}
    </div>
  );
};

export default TVSection;
