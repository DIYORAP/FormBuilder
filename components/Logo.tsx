import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <Link
        href={"/"}
        className="font-bold text-3xl bg-gradient-to-r from-red-600 to-green-300 text-transparent bg-clip-text hover:cursor-pointer"
      >
        Form Builder
      </Link>
    </div>
  );
}

export default Logo;
