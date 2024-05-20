/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
"use client";

import React from "react";
import { LuLogOut } from "react-icons/lu";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { JSX, SVGProps } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/Auth";

// components

const BASEURL = process.env.NEXT_PUBLIC_BASEURL;

const Sidebar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const { authState, isUserAuthenticated } = useAuth();
  const name = authState.user.name;
  const role = authState.user.role;

  const handleLogOut = async () => {
    try {
      console.log(authState.token);
      const response = await axios.post(
        `${BASEURL}/v1/user/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );
      console.log(response);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.reload();
      toast.success(response.data.success);
    } catch (err: any) {
      toast.error(err.response.data.message);
      console.log("Error", err);
    }
  };

  return (
    <div>
      <div
        className="md:hidden fixed top-0 right-0 z-50 mr-3 mt-3"
        onClick={toggleSidebar}
      >
        <div className="w-6 h-6 relative">
          <RxHamburgerMenu className="h-6 w-6 text-black absolute top-3 left-0" />
        </div>
      </div>

      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed inset-y-0 left-0 z-40 transition duration-300 ease-in-out 
        bg-[#fff] overflow-y-auto p-2 w-1/2 border md:w-[20rem] flex flex-col justify-start items-center min-h-screen`}
      >
        <div className="border w-full p-4 flex flex-col justify-between items-center rounded-xl">
          {isUserAuthenticated() ? (
            <div className="flex flex-col sm:flex justify-center items-center gap-4">
              <div className="">{name}</div>
              <div className="text-pink-500 font-semibold ">{role}</div>
              <Button onClick={handleLogOut} className="bg-[#2a4185] hover:bg-[#2a4185]/90">Logout</Button>
            </div>
          ) : (
            <Link
              className="font-medium inline-flex h-9 items-center text-[#2a4185] rounded-md hover:bg-[#2a4185] hover:text-white px-4 py-2 transition-colors dark:hover:bg-gray-800 dark:hover:text-gray-50"
              href="/login"
            >
              Login
            </Link>
          )}
        </div>
        <div className="flex flex-col justify-center space-y-8 text-xl font-semibold  items-center pt-10">
          <Link className="flex" href="#">
            <FlagIcon className="h-6 w-6" />
            <span className="text-[#2a4185]">Logo</span>
          </Link>
          <div className="flex flex-col space-y-2">
            <Link
              className="font-medium inline-flex h-9 items-center text-[#2a4185] rounded-md hover:bg-[#2a4185] hover:text-white px-4 py-2 transition-colors dark:hover:bg-gray-800 dark:hover:text-gray-50"
              href="/"
            >
              Home
            </Link>
            <Link
              className="font-medium inline-flex h-9 items-center text-[#2a4185]  rounded-md hover:bg-[#2a4185] hover:text-white  px-4 py-2 transition-colors dark:hover:bg-gray-800 dark:hover:text-gray-50"
              href="/courses"
            >
              Courses
            </Link>
            <Link
              className="font-medium inline-flex h-9 items-center text-[#2a4185] rounded-md hover:bg-[#2a4185] hover:text-white  px-4 py-2 transition-colors dark:hover:bg-gray-800 dark:hover:text-gray-50"
              href="/courses/my-courses"
            >
              My Courses
            </Link>
            <Link
              className="font-medium inline-flex h-9 items-center text-[#2a4185] rounded-md hover:bg-[#2a4185] hover:text-white  px-4 py-2 transition-colors dark:hover:bg-gray-800 dark:hover:text-gray-50"
              href="/courses"
            >
              Subscriptions
            </Link>
            <Link
              className="font-medium inline-flex h-9 items-center text-[#2a4185] rounded-md hover:bg-[#2a4185] hover:text-white px-4 py-2 transition-colors dark:hover:bg-gray-800 dark:hover:text-gray-50"
              href="#"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

function FlagIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  );
}

export default Sidebar;
