"use client";
import Blogs from "@/components/blogs";
import { HeroSection } from "@/components/hero-section";
import useBlog from "@/hooks/useBlogs";
import Image from "next/image";

export default function Home() {
  const { blogs } = useBlog();
  return (
    <div className="w-full px-40 my-20">
      <HeroSection />
      <Blogs title="Recent blogs" blogs={blogs} />
    </div>
  );
}
