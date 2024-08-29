import SearchPage from "@/app/(components)/SearchPage";
import React, { Suspense } from "react";

const SearchMoviePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPage />
    </Suspense>
  );
};

export default SearchMoviePage;
