import React, { Suspense } from "react";
import PlayMovie from "../PlayMovie/page";

const PlayMoviePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PlayMovie />
    </Suspense>
  );
};

export default PlayMoviePage;
