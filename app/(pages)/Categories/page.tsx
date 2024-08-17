import React from "react";
import { showList } from "@/lib/global";
import Cards from "@/app/(components)/Cards/page";
import { Category } from "@/lib/types";

const Categories = () => {
  return (
    <div className="categories-container relative top-[210px] text-white w-full p-10 bg-black">
      <h1 className="font-bold text-[35px]">Categories</h1>
      <Cards />
    </div>
  );
};

export default Categories;
