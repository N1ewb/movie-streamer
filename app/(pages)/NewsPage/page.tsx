import NewsContent from "@/app/(components)/NewsComponents/NewsContent";
import NewsSidebar from "@/app/(components)/NewsComponents/NewsSidebar";
import React from "react";

const NewsPage = () => {
  const newsContent = [
    {
      title: "Crispyroll Upgrades Streaming Provider",
      createdAt: "September 5, 2024",
      content:
        "We’re pleased to announce that Crispyroll has switched to a new, top-tier streaming provider! This upgrade ensures even better availability and performance of your favorite shows and movies. Enjoy a smoother, more reliable streaming experience as we continue to bring you the best in entertainment.",
    },
    {
      title: "Crispyroll Launches New Streaming Platform",
      createdAt: "August 25, 2024",
      content:
        "Exciting news for streaming enthusiasts! We are delighted to introduce Crispyroll, your new go-to platform for a diverse selection of movies and TV shows. Whether you're into the latest releases or timeless classics, Crispyroll has something for everyone. Enjoy a seamless viewing experience and explore our ever-growing library of content.",
    },
  ];

  return (
    <div className="flex h-screen w-full bg-gray-800  ">
      <NewsSidebar news={newsContent} />
      <main className="flex-1 bg-[#CECECE]  p-8 pt-[110px] overflow-y-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Crispyroll News and Updates
        </h1>
        <div className="space-y-6">
          {newsContent.map((news) => (
            <NewsContent key={news.title} news={news} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default NewsPage;
