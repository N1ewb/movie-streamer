"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Header = () => {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [searchClicked, setSearchClicked] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearchClick = () => {
    setSearchClicked(!searchClicked);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 500) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (searchValue) {
      router.push(
        `/SearchPage?query=${encodeURIComponent(searchValue.trim())}`
      );
    } else {
      router.push("/");
    }
  }, [searchValue, router]);

  return (
    <div
      className={`navbar-container fixed flex flex-row w-full justify-between items-center p-5 text-white z-50 transition-colors duration-500 ease-in-out ${
        scrolled
          ? "bg-[#141414]"
          : "bg-gradient-to-b via-[#000000d2] from-[#000000]"
      }`}
    >
      <div className="logo-container ">
        <Link href="/">
          <div className=" flex flex-row items-center gap-3">
            <Image
              className="roll-img cursor-pointer xl:w-[30] xl:h-[auto]"
              src="/ROLL.png"
              alt="logo"
              height={45}
              width={45}
              priority
            />
            <Image
              className="cursor-pointer xl:w-[150px] xl:h-[auto]"
              src="/crispyroll.png"
              alt="logo"
              height={100}
              width={200}
              priority
            />
          </div>
        </Link>
      </div>
      <div className="nav-links flex flex-row justify-between w-[33%] align-middle items-center md:hidden">
        <Link
          className="m-0 font-semibold hover:-translate-x-1 transition-all duration-300 ease-in-out"
          href="#"
        >
          Browse
        </Link>
        <Link
          className="m-0 font-semibold hover:-translate-x-1 transition-all duration-300 ease-in-out"
          href="#"
        >
          News
        </Link>
        <Link
          className="m-0 font-semibold hover:-translate-x-1 transition-all duration-300 ease-in-out"
          href="/SearchPage"
        >
          Search Movies
        </Link>
      </div>
      <div className="flex flex-row-reverse w-[33%] items-center">
        <div className="div  flex flex-row-reverse justify-between w-[30%] items-center md:w-[60%] ">
          <Image
            src="/default-avatar.png"
            alt="default-profile"
            height={50}
            width={50}
            className="cursor-pointer hover:-translate-x-1 transition-all duration-300 ease-in-out "
          />

          <div className="relative flex flex-row-reverse items-center">
            <Image
              onClick={() => handleSearchClick()}
              src="/search-white.png"
              alt="Search"
              width={25}
              height={25}
              className={`cursor-pointer hover:-translate-x-1 transition-all duration-300 ease-in-out sm:hidden ${
                searchClicked ? "hidden" : "block"
              }`}
            />
            <input
              name="search"
              type="text"
              placeholder="Search "
              className={`absolute right-0 transition-all duration-500 ease-in-out text-black sm:opacity-100 sm:w-[150px] sm:pl-3 ${
                searchClicked
                  ? "w-[200px] opacity-100 pl-3"
                  : "w-0 opacity-0 pl-0"
              }`}
              onBlur={() => handleSearchClick()}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
