import dynamic from "next/dynamic";
import React from "react";

//@ts-ignore
const Dashboard = dynamic(() => import("@/components/dashboard"), {
  ssr: false,
});

const page = () => {
  return <Dashboard />;
};

export default page;
