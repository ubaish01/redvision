// app/blog/[code]/page.js
"use client";

import { Blog } from "@/components/blog";
import useBlog from "@/hooks/useBlogs";
import { useParams } from "next/navigation";

export default function BlogDetails() {
  const { code } = useParams();
  const { blog } = useBlog(code?.toString());

  return (
    <div className="my-20">
      {/* @ts-ignore */}
      <Blog blog={blog} />
    </div>
  );
}
