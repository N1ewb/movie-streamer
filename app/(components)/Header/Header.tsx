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
  const [showDropdown, setShowDropDown] = useState<boolean>(false);

  const navLinks = [
    {
      tag: "Browse",
      link: "/BrowsePage",
    },
    {
      tag: "News",
      link: "/NewsPage",
    },
    {
      tag: "Search Movies",
      link: "/SearchPage",
    },
  ];

  const handleShowDropdown = () => {
    console.log(showDropdown);
    setShowDropDown(!showDropdown);
  };

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
          <div className=" flex flex-row items-center gap-3 [&_img]:w-[auto] xl:[&_img]:h-[40px]  lg:[&_img]:h-[35px] md:[&_img]:h-[30px] sm:[&_img]:h-[25px] xsm:[&_img]:h-[20px] xxsm:[&_img]:h-[15px]">
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
              width={170}
              height={80}
              priority
            />
          </div>
        </Link>
      </div>

      <div className="nav-links flex flex-row justify-around w-[70%] align-middle items-center md:hidden md:w-0 ">
        {navLinks.map((navLink) => (
          <Link
            key={navLink.tag}
            className={`m-0 font-semibold hover:-translate-x-1 transition-all duration-300 ease-in-out ${
              navLink.tag === "Search Movies" ? "hidden" : ""
            }`}
            href={navLink.link}
          >
            {navLink.tag}
          </Link>
        ))}
        <div className=" flex flex-row-reverse items-center w-[40%] [&_img]:w-[auto] sm:[&_img]:h-[20px] xsm:[&_img]:h-[15px]">
          <Image
            onClick={() => handleSearchClick()}
            src="/search-white.png"
            alt="Search"
            height={25}
            width={25}
            className={`cursor-pointer
      hover:-translate-x-1 transition-all duration-300 ease-in-out sm:hidden ${
        searchClicked ? "hidden" : "block"
      }`}
          />{" "}
          <input
            name="search"
            type="text"
            placeholder="Search "
            className={`absolute right-32 top-8 transition-all
      duration-500 ease-in-out text-black sm:opacity-100 sm:w-[150px] sm:pl-3 ${
        searchClicked ? "w-[200px] opacity-100 pl-3" : "w-0 opacity-0 pl-0"
      }`}
            onBlur={() => handleSearchClick()}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      <div
        className={` flex flex-col absolute opacity-0 left-0  bg-black  gap-5 justify-between items-center py-10 w-full text-white z-50 transition-all ease-in-out duration-500 ${
          showDropdown ? " top-16 md:opacity-100" : "-top-40"
        } `}
      >
        {navLinks.map((navLink) => (
          <Link
            key={navLink.tag}
            className="m-0 font-semibold hover:-translate-x-1 transition-all duration-300 ease-in-out z-50"
            href={navLink.link}
          >
            {navLink.tag}
          </Link>
        ))}
      </div>
      <div className="burger hidden md:flex z-10">
        <Image
          onClick={() => handleShowDropdown()}
          src="/menu.png"
          alt="menu"
          width={30}
          height={30}
        />
      </div>
    </div>
  );
};

export default Header;
