"use client";

import { getRequest, postRequest } from "@/request/request";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const useAuth = () => {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const isLogin = () => {
    const authenticated = localStorage.getItem("login");
    return authenticated;
  };

  const login = async (data: { email: string; password: string }) => {
    setLoading(true);
    const responsePromise = postRequest("/auth/login", data);
    toast.promise(responsePromise, {
      loading: "logging in...",
      success: (response) => {
        if (response.data.success) {
          localStorage.setItem("login", "true");
          setLoading(false);
          router.push("/dashboard");
          return response.data.message;
        } else {
          setLoading(false);
          throw response.data?.message;
        }
      },
      error: (error) => error,
    });
  };

  const signup = async (data: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  }) => {
    setLoading(true);
    const responsePromise = postRequest("/auth/register", data);
    toast.promise(responsePromise, {
      loading: "signing up...",
      success: (response) => {
        if (response.data.success) {
          localStorage.setItem("login", "true");
          router.push("/dashboard");
          setLoading(false);
          return response.data.message;
        } else {
          setLoading(false);
          throw response.data?.message;
        }
      },
      error: (error) => error,
    });
  };

  const logout = async () => {
    setLoading(true);
    const responsePromise = getRequest("/auth/logout");
    toast.promise(responsePromise, {
      loading: "loggin out...",
      success: (response) => {
        if (response.data.success) {
          localStorage.removeItem("login");
          router.push("/auth");
          setLoading(false);
          return response.data.message;
        } else {
          setLoading(false);
          throw response.data?.message;
        }
      },
      error: (error) => error,
    });
  };

  return {
    isLoading,
    login,
    signup,
    logout,
    isLogin,
  };
};

export default useAuth;
