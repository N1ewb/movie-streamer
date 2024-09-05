import PlayMovie from "@/app/(components)/PageContent/PlayMovie";
import React, { Suspense } from "react";

const PlayMoviePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PlayMovie />
    </Suspense>
  );
};

export default PlayMoviePage;
