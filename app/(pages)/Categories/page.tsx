import React from "react";
import { showList } from "@/lib/global";
import Cards from "@/app/(components)/Cards/page";
import { Category } from "@/lib/types";

const Categories: React.FC = () => {
  const filterShowsByCategory = (
    shows: Category[],
    category: string
  ): Category[] => {
    return shows.filter((show) => show.category === category);
  };

  const Romcom = filterShowsByCategory(showList, "RomCom");
  const Drama = filterShowsByCategory(showList, "Drama");
  const Action = filterShowsByCategory(showList, "Action");
  const Comedy = filterShowsByCategory(showList, "Comedy");

  return (
    <div className="categories-container relative top-[210px] text-white w-full p-10 bg-black">
      <h1 className="font-bold text-[35px]">Categories</h1>
      <div>
        <h3>Rom Com</h3>
        <Cards categories={Romcom} />
      </div>
      <div>
        <h3>Drama</h3>
        <Cards categories={Drama} />
      </div>
      <div>
        <h3>Action</h3>
        <Cards categories={Action} />
      </div>
      <div>
        <h3>Comedy</h3>
        <Cards categories={Comedy} />
      </div>
    </div>
  );
};

export default Categories;
