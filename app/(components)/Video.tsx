import React from "react";

const Video = () => {
  const videoURL = "nY5IAhjTclY";

  return (
    <div className="w-[560px] h-[315px] text-white">
      <p>Video</p>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoURL}?si=97yzAPqUjH2tr5Rm`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Video;
