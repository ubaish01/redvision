import React from "react";
import { BlogCard } from "./ui/blog-card";
import Link from "next/link";

const Blogs = ({ title }: { title: String }) => {
  return (
    <div id="blogs">
      <h1 className="text-center my-16 text-5xl font-bold uppercase">
        {title}
      </h1>
      <div className="  grid grid-cols-3 gap-12">
        <Link href={`/blog/blog-title`} className="col-span-1 ">
          <BlogCard />
        </Link>
        <Link href={`/blog/blog-title`} className="col-span-1 ">
          <BlogCard />
        </Link>
        <Link href={`/blog/blog-title`} className="col-span-1 ">
          <BlogCard />
        </Link>
        <Link href={`/blog/blog-title`} className="col-span-1 ">
          <BlogCard />
        </Link>
        <Link href={`/blog/blog-title`} className="col-span-1 ">
          <BlogCard />
        </Link>
        <Link href={`/blog/blog-title`} className="col-span-1 ">
          <BlogCard />
        </Link>
      </div>
    </div>
  );
};

export default Blogs;
