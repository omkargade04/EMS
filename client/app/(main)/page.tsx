"use client";
import Image from "next/image";
import Eduimg1 from "@/public/images/edu-img1.jpg";
import Stripeimg1 from "@/public/images/png-clipart-colored-stripes-stripe-geometric-patterns.png";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useAuth } from "../context/Auth";

export default function Home() {
  const { isUserAuthenticated } = useAuth();

  return (
    <main className="">
      <div className="sm:relative max-w-7xl w-full mx-auto overflow-hidden rounded-t-lg">
        <div className="">
          <Image
            alt="Hero"
            height={400}
            src={Eduimg1}
            width={1440}
            className="hidden sm:block"
          />
        </div>

        <div className="sm:absolute inset-0 bg-[rgba(255,255,255,0.75)] backdrop-blur flex items-center justify-center p-4">
          <div className="grid gap-4 text-center">
            <h1 className="text-2xl font-bold text-[#2a4185] transform hover:scale-110 transition-transform duration-300 tracking-tighter sm:text-5xl ">
              WELCOME TO EDUSPHERE
            </h1>
            <p className="mx-auto max-w-2xl text-gray-500 md:text-md/relaxed dark:text-gray-400">
              Introduce your child to the world of programming with our fun and
              interactive coding courses designed for kids of all ages.
            </p>
            {!isUserAuthenticated() && (
              <div className=" m-7 flex justify-center items-center">
                <h2 className="text-2xl sm:text-3xl flex justify-center items-center text-[#2a4185]">
                  Register Below
                </h2>
              </div>
            )}
            <div className="flex justify-center items-center m-4">
              {!isUserAuthenticated() ? (
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                  <Link href="/student/register">
                    <Button className="bg-[#eb5f9e] p-2 rounded-md text-white hover:bg-[#d04370]">
                      Register as Student
                    </Button>
                  </Link>
                  <Link href="/educator/register">
                    <Button className="bg-[#eb5f9e] p-2 rounded-md text-white hover:bg-[#d04370]">
                      Register as Educator
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="">
                  <Link href="/courses">
                    <Button className="bg-[#eb5f9e] p-2 rounded-md text-white hover:bg-[#d04370]">
                      View Courses
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
