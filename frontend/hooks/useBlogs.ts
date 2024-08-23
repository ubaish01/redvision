import { getRequest, postRequest } from "@/request/request";
import { Blog } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const useBlog = (code: string = "") => {
  const [blogs, setBlogs] = useState([]);
  const [blog, setBlog] = useState<Blog>();
  const [myBlogs, setMyBlogs] = useState([]);
  const router = useRouter();

  const fetchBlogs = async () => {
    try {
      const response = await getRequest("/blogs");
      console.log(response.data.blogs);
      setBlogs(response?.data?.blogs);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMyBlogs = async () => {
    try {
      const response = await getRequest("/blogs/mine");
      console.log("Calling fetch my blogs");
      setMyBlogs(response?.data?.blogs);
    } catch (error) {
      console.log(error);
    }
  };

  const CreateBlog = async (data: FormData) => {
    const responsePromise = postRequest("/blogs", data);
    toast.promise(responsePromise, {
      loading: "posting...",
      success: async (response) => {
        if (response.data.success) {
          setTimeout(() => {
            router.refresh();
          }, 100);
          return response.data.message;
        } else {
          throw response.data?.message;
        }
      },
      error: (error) => error,
    });
  };

  const fetchBlog = async () => {
    try {
      const response = await getRequest(`/blogs/details/${code}`);
      console.log(response?.data);
      setBlog(response?.data?.blog);
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    fetchBlogs();
    fetchMyBlogs();
  }, []);

  useEffect(() => {
    fetchBlog();
  }, [code]);

  return {
    blogs,
    myBlogs,
    CreateBlog,
    fetchBlog,
    blog,
  };
};

export default useBlog;
