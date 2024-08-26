import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="fixed flex flex-row w-full justify-between align-middle p-5 bg-[#23252B] text-white z-50">
      <div className="logo-container w-[33%]">
        <Link href="/">
          <Image src="/Logo.png" alt="logo" height={160} width={160} />
        </Link>
      </div>
      <div className="nav-links flex flex-row justify-between w-[33%] align-middle items-center">
        <Link className="m-0 " href="#">
          Browse
        </Link>
        <Link className="m-0" href="#">
          News
        </Link>
        <Link href="/Search">Search Movies</Link>
      </div>
      <div className="flex flex-row-reverse w-[33%]">
        <Image
          src="/default-avatar.png"
          alt="default-profile"
          height={50}
          width={50}
        />
      </div>
    </div>
  );
};

export default Header;
