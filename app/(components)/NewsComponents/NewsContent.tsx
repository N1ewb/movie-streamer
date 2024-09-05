import React from "react";

interface NewsContentProps {
  news: {
    title: string;
    createdAt: string;
    content: string;
  };
}

const NewsContent = ({ news }: NewsContentProps) => {
  return (
    <div
      id={news.title}
      className="border border-gray-300 rounded-lg p-6 shadow-md bg-white"
    >
      <h1 className="text-2xl font-bold text-gray-800 mb-2">{news.title}</h1>
      <p className="text-sm text-gray-600 mb-4">{news.createdAt}</p>
      <p className="text-gray-700 leading-relaxed">{news.content}</p>
    </div>
  );
};

export default NewsContent;
