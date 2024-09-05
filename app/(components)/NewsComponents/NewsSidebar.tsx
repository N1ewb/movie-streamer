import React from "react";

interface NewsSidebarProps {
  news: {
    title: string;
    createdAt: string;
    content: string;
  }[];
}

const NewsSidebar = ({ news }: NewsSidebarProps) => {
  return (
    <div className="w-[20%] text-white pt-[120px] flex flex-col  gap-5 bg-gray-800 lg:w-[30%] md:hidden px-5">
      <p className="text-[#c9c9c9]">News Overview</p>
      {news.map((item) => (
        <a
          key={item.title}
          href={`#${item.title.replace(/\s+/g, "-")}`}
          className="font-bold text-blue-400 hover:underline"
        >
          {`#${item.title}`}
        </a>
      ))}
    </div>
  );
};

export default NewsSidebar;
