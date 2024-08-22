// app/blog/[code]/page.js
"use client";

import { Blog } from "@/components/blog";
import { useParams } from "next/navigation";

export default function BlogDetails() {
  const { code } = useParams();

  return (
    <div className="my-20">
      <Blog />
    </div>
  );
}
