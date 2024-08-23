"use client";
import React, { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Toaster } from "sonner";

const AUTH_STATE = {
  LOGIN: 1,
  SIGNUP: 2,
};

export const AuthForm = () => {
  const [state, setState] = useState(AUTH_STATE.SIGNUP);
  const { isLoading, isLogin, login, signup } = useAuth();
  const router = useRouter();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  if (isLogin()) {
    return router.push("/dashboard");
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    // console.log(data);
    e.preventDefault();
    login(data);
  };
  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup(data);
  };

  return (
    <>
      {state === AUTH_STATE.SIGNUP ? (
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
          <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
            Welcome to redvision blogs
          </h2>
          <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            Signup to redvision if you want to write some quality blogs
          </p>

          <form className="my-8" onSubmit={handleSignup}>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <LabelInputContainer>
                <Label htmlFor="firstname">First name</Label>
                <Input
                  disabled={isLoading}
                  id="firstname"
                  minLength={3}
                  maxLength={12}
                  onChange={(e) => {
                    if (e.target.value == " ") return;
                    else
                      setData({
                        ...data,
                        firstName: e.target.value,
                      });
                  }}
                  value={data.firstName}
                  placeholder="Tyler"
                  type="text"
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="lastname">Last name</Label>
                <Input
                  disabled={isLoading}
                  id="lastname"
                  placeholder="Durden"
                  type="text"
                  minLength={3}
                  maxLength={12}
                  onChange={(e) => {
                    if (e.target.value == " ") return;
                    else
                      setData({
                        ...data,
                        lastName: e.target.value,
                      });
                  }}
                  value={data.lastName}
                />
              </LabelInputContainer>
            </div>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input
                disabled={isLoading}
                id="email"
                placeholder="projectmayhem@fc.com"
                type="email"
                onChange={(e) => {
                  if (e.target.value == " ") return;
                  else
                    setData({
                      ...data,
                      email: e.target.value,
                    });
                }}
                value={data.email}
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                disabled={isLoading}
                id="password"
                placeholder="••••••••"
                type="password"
                minLength={6}
                onChange={(e) => {
                  if (e.target.value == " ") return;
                  else
                    setData({
                      ...data,
                      password: e.target.value,
                    });
                }}
                value={data.password}
              />
            </LabelInputContainer>
            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
              disabled={isLoading}
            >
              Sign up &rarr;
              <BottomGradient />
            </button>
            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
            <div className="text-center">
              Already have an account ?{" "}
              <button
                className="text-blue-500 font-medium underline"
                onClick={() => {
                  setState(AUTH_STATE.LOGIN);
                }}
              >
                {" "}
                Login
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
          <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
            Welcome to redvision blogs
          </h2>
          <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            Login to redvision if you want to write some quality blogs
          </p>

          <form className="my-8" onSubmit={handleLogin}>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input
                disabled={isLoading}
                id="email"
                placeholder="projectmayhem@fc.com"
                type="email"
                onChange={(e) => {
                  if (e.target.value == " ") return;
                  else
                    setData({
                      ...data,
                      email: e.target.value,
                    });
                }}
                value={data.email}
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                disabled={isLoading}
                id="password"
                placeholder="••••••••"
                type="password"
                onChange={(e) => {
                  if (e.target.value == " ") return;
                  else
                    setData({
                      ...data,
                      password: e.target.value,
                    });
                }}
                value={data.password}
              />
            </LabelInputContainer>
            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
              disabled={isLoading}
            >
              Login &rarr;
              <BottomGradient />
            </button>
            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
            <div className="text-center">
              Dont have an account ?{" "}
              <button
                className="text-blue-500 font-medium underline"
                onClick={() => {
                  setState(AUTH_STATE.SIGNUP);
                }}
              >
                {" "}
                Signup
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

export const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
