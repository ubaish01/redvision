"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import Link from "next/link";
import { Blog } from "@/types/types";

const defaultPoster =
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export function BlogCard({ blog }: { blog: Blog }) {
  return (
    <CardContainer className="inter-var  h-full ">
      <CardBody className="bg-gray-50 flex flex-col justify-end h-full relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem]  rounded-xl p-6 border  ">
        <div>
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-600 dark:text-white"
          >
            {blog?.title}
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
          >
            {blog?.subtitle}
          </CardItem>
          <CardItem translateZ="100" className="w-full mt-4">
            <Image
              src={blog?.poster}
              height="1000"
              width="1000"
              className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt={defaultPoster}
            />
          </CardItem>
        </div>

        <div className="flex  justify-center items-center mt-20">
          <CardItem
            translateZ={20}
            as={Link}
            href={`/blog/${blog?.code}`}
            className="px-12 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            Read more
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
