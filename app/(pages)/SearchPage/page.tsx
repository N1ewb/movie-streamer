import React, { Suspense } from "react";
import PlayMovieContent from "@/components/PlayMovieContent";
import SearchPage from "../Search/page";

const SearchMoviePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPage />
    </Suspense>
  );
};

export default SearchMoviePage;
