"use client";

import React, { useEffect, useState } from "react";
import Blogs from "./blogs";

const BlogModal = dynamic(() => import("@/components/blog-modal"), {
  ssr: false,
});

import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import dynamic from "next/dynamic";
import useBlog from "@/hooks/useBlogs";
import { getRequest } from "@/request/request";

const Dashboard = () => {
  const router = useRouter();
  const { isLogin } = useAuth();
  const [blogs, setBlogs] = useState([]);

  const fetchMyBlogs = async () => {
    try {
      const response = await getRequest("/blogs/mine");
      console.log("Calling fetch my blogs");
      setBlogs(response?.data?.blogs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  if (!isLogin()) {
    return router.push("/auth");
  }

  return (
    <div className="w-screen px-40 py-0">
      {/* <button
        className="mt-32 bg-red-500 p-8"
        onClick={() => {
          setBlogs([]);
        }}
      >
        delete
      </button> */}
      <BlogModal refetch={fetchMyBlogs} />
      <Blogs title="My blogs" blogs={blogs} />
    </div>
  );
};

export default Dashboard;
