"use client";

import Link from "next/link";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";

export function HeroSection() {
  const words = [
    {
      text: "Write",
    },
    {
      text: "awesome",
    },
    {
      text: "blogs",
    },
    {
      text: "with",
    },
    {
      text: "RedVisionBlogs.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="flex h-screen flex-col items-center justify-center   ">
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
        The road to freedom starts from here
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <Link
          href={"#blogs"}
          className="w-40 h-10 rounded-xl bg-black border flex items-center justify-center dark:border-white border-transparent text-white text-sm"
        >
          Recent Blogs
        </Link>
        <Link
          href={"/dashboard"}
          className="w-40 h-10 rounded-xl bg-white flex items-center justify-center text-black border border-black  text-sm"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
}
