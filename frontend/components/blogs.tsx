"use client";
import React from "react";
import { BlogCard } from "./ui/blog-card";
import Link from "next/link";
import { Blog } from "@/types/types";

const Blogs = ({ title, blogs }: { title: String; blogs: Blog[] }) => {
  return (
    <div id="blogs">
      <h1 className="text-center my-16 text-5xl font-bold uppercase">
        {title}
      </h1>
      <div className="flex flex-wrap gap-6  justify-center ">
        {blogs?.map((blog: Blog, index: number) => (
          <BlogCard key={index} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
