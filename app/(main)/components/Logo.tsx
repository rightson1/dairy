import Image from "next/image";
import React from "react";
import Link from "next/link";
const Logo = () => {
  return (
    <Link href="/">
      <Image
        src="/logo.svg"
        alt="Logo"
        width={100}
        height={100}
        className="w-16  sm:w-24 "
      />
    </Link>
  );
};

export default Logo;
