"use client";
import Blogs from "@/components/blogs";
import { HeroSection } from "@/components/hero-section";
import useBlog from "@/hooks/useBlogs";
import Image from "next/image";

export default function Home() {
  const { blogs } = useBlog();
  return (
    <div className="w-full lg:px-40 md:px-24 sm:px-12 px-4 my-20">
      <HeroSection />
      <Blogs title="Recent blogs" blogs={blogs} />
    </div>
  );
}
