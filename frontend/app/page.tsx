import Blogs from "@/components/blogs";
import { HeroSection } from "@/components/hero-section";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full px-40 my-20">
      <HeroSection />
      <Blogs title="Recent blogs" />
    </div>
  );
}
