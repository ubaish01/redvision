"use client";

import React from "react";
import Blogs from "./blogs";

const BlogModal = dynamic(() => import("@/components/blog-modal"), {
  ssr: false,
});

import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import dynamic from "next/dynamic";
import useBlog from "@/hooks/useBlogs";

const Dashboard = () => {
  const router = useRouter();
  const { isLogin } = useAuth();
  const { myBlogs } = useBlog();

  if (!isLogin()) {
    return router.push("/auth");
  }

  return (
    <div className="w-screen px-40 py-0">
      <BlogModal />
      <Blogs title="My blogs" blogs={myBlogs} />
    </div>
  );
};

export default Dashboard;
