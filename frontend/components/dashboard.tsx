"use client";

import React from "react";
import { BottomGradient } from "./auth-form";
import Blogs from "./blogs";
import { BlogModal } from "./blog-modal";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { Toaster } from "sonner";

const Dashboard = () => {
  const router = useRouter();
  const { isLogin } = useAuth();

  if (!isLogin()) {
    return router.push("/auth");
  }

  return (
    <div className="w-screen px-40 py-0">
      <BlogModal />
      <Blogs title="My blogs" />
    </div>
  );
};

export default Dashboard;
