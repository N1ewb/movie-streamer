import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="flex flex-row justify-between align-middle p-5 bg-[#23252B] text-white">
      <div className="w-[33%]">
        <Image src="/Logo.png" alt="logo" height={160} width={160} />
      </div>
      <div className="flex flex-row justify-between w-[33%] align-middle items-center">
        <Link className="m-0 " href="#">
          Browse
        </Link>
        <Link className="m-0" href="#">
          News
        </Link>
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
