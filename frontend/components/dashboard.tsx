import React from "react";
import { BottomGradient } from "./auth-form";
import Blogs from "./blogs";
import { BlogModal } from "./blog-modal";

const Dashboard = () => {
  return (
    <div className="w-screen px-40 py-0">
      <BlogModal />
      <Blogs title="My blogs" />
    </div>
  );
};

export default Dashboard;
