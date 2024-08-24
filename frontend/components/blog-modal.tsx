"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "./ui/animated-modal";
import { BottomGradient, LabelInputContainer } from "./auth-form";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { TextArea } from "./ui/text-area";
import useAuth from "@/hooks/useAuth";
import useBlog from "@/hooks/useBlogs";
import { toast } from "sonner";
import { Blog } from "@/types/types";

export default function BlogModal({ refetch }: { refetch: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
  const { CreateBlog } = useBlog();
  const [data, setData] = useState<Blog>({
    title: "",
    subtitle: "",
    content: "",
    poster: "",
  });
  const [posterFile, setPosterFile] = useState<File | null>(null);

  const clearInput = () => {
    setData({
      title: "",
      subtitle: "",
      content: "",
      poster: "",
    });
    setPosterFile(null);
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("subtitle", data.subtitle);
    formData.append("content", data.content);
    if (posterFile) {
      formData.append("poster", posterFile);
    }

    try {
      await CreateBlog(formData); // Adjust the CreateBlog function to accept FormData
      await refetch();
      clearInput();
      setIsOpen(false);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="py-20 flex items-center justify-center">
      <Modal open={isOpen} setOpen={setIsOpen}>
        <div className="flex items-center justify-between w-full">
          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 flex items-center justify-center gap-2 dark:bg-zinc-800 w-fit px-12 text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            onClick={logout}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
              />
            </svg>
            Logout
            <BottomGradient />
          </button>
          <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
            <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500 px-8">
              Create
            </span>
            <div className="-translate-x-40 text-black group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 z-20">
              😍LessGoo
            </div>
          </ModalTrigger>
        </div>
        <ModalBody>
          <ModalContent>
            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
              Start writing quality blogs with{" "}
              <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                redVision
              </span>
            </h4>
            <form className="my-8" onSubmit={submit}>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Getting start with Nextjs"
                  type="text"
                  value={data.title}
                  required
                  onChange={(e) => {
                    if (e.target.value === " ") return;
                    setData({
                      ...data,
                      title: e.target.value,
                    });
                  }}
                />
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="subtitle">Sub Title</Label>
                <Input
                  id="subtitle"
                  placeholder="you will learn more about this..."
                  type="text"
                  value={data.subtitle}
                  required
                  onChange={(e) => {
                    if (e.target.value === " ") return;
                    setData({
                      ...data,
                      subtitle: e.target.value,
                    });
                  }}
                />
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="content">Content</Label>
                <TextArea
                  id="content"
                  placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum quis, non temporibus eligendi, omnis, facilis eos quibusdam ullam accusantium recusandae nihil veritatis sequi cupiditate..."
                  value={data.content}
                  required
                  onChange={(e) => {
                    if (e.target.value === " ") return;
                    setData({
                      ...data,
                      content: e.target.value,
                    });
                  }}
                />
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="poster">Select a poster</Label>
                <Input
                  id="poster"
                  type="file"
                  accept=".jpg,.jpeg"
                  required
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setPosterFile(e.target.files[0]);
                    }
                  }}
                />
              </LabelInputContainer>
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-white dark:text-white border border-gray-300 rounded-md text-sm w-28"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28"
                >
                  Submit
                </button>
              </div>
            </form>
          </ModalContent>
        </ModalBody>
      </Modal>
    </div>
  );
}
