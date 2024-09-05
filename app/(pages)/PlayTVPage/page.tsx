import PlayTV from "@/app/(components)/PageContent/PlayTV";
import React, { Suspense } from "react";

const PlayMoviePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PlayTV />
    </Suspense>
  );
};

export default PlayMoviePage;
