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
    <main className="px-4 sm:px-6 lg:px-8">
      {/* <Image 
        alt="Hero"
        className="aspect-[1] object-cover object-center bg-transparent"
        height={100}
        src={Stripeimg1}
        width={2000}
      /> */}
      <div className="relative max-w-7xl w-full mx-auto overflow-hidden rounded-t-lg">
        <Image
          alt="Hero"
          className="aspect-[1] flex justify-center items-center object-cover object-center"
          height={400}
          src={Eduimg1}
          width={900}
        />
        <div className="absolute inset-0 bg-[rgba(255,255,255,0.75)] backdrop-blur flex items-center justify-center p-4">
          <div className="grid gap-4 text-center">
            <h1 className="text-6xl font-bold text-[#2a4185] tracking-tighter sm:text-8xl ">
              WELCOME TO ACADEMIA
            </h1>
            <p className="mx-auto max-w-2xl text-gray-500 md:text-xl/relaxed dark:text-gray-400">
              Introduce your child to the world of programming with our fun and
              interactive coding courses designed for kids aged 8-12.
            </p>
          </div>
        </div>
      </div>
      {/* <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col md:flex-row items-center justify-between transition-colors duration-500">
        <div className="max-w-lg mr-16 mx-auto md:mx-0 md:pl-0">
          <h2 className="text-7xl  md:text-7xl font-bold text-[#2a4185] mb-4 md:mb-6">
            WELCOME TO ACADEMIA
          </h2>
          <p className="text-lg md:text-2xl font-bold text-[#eb5f9e] mb-3">
            Best Online Education Expertise
          </p>
          <p className="mb-6 md:pr-16">
            Far far away, behind the word mountains, far from the countries
            Vokalia and Consonantia, there live the blind texts.
          </p>
          {!isUserAuthenticated() && (
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <Link href="/student/register">
                <Button className="bg-[#2a4185] p-2 rounded-md text-white hover:bg-[#151e39]">
                  Register as Student
                </Button>
              </Link>
              <Link href="/educator/register">
                <Button className="bg-[#2a4185] p-2 rounded-md text-white hover:bg-[#151e39]">
                  Register as Educator
                </Button>
              </Link>
            </div>
          )}
        </div>
        <div className="image-wrapper mt-6 md:mt-0 md:ml-8 overflow-hidden">
          <Image
            src={Eduimg1}
            height={750}
            width={750}
            alt="edu-image"
            className="object-contain"
          ></Image>
        </div>
      </header> */}

      <h2 className="text-center text-3xl md:text-5xl font-semibold text-[#eb5f9e] pt-10">
        Our Learning Library
      </h2>
      <p className="text-center text-lg pt-7">
        These are some of the courses which our platform offers
      </p>

      <div className="flex flex-col md:flex-row justify-evenly pt-14">
        <Card className="w-full max-w-sm mb-8 md:mb-0 rounded-xl border">
          <CardHeader className="p-6">
            <CardTitle className="text-lg md:text-xl text-[#2a4185] font-semibold">
              Introduction to Quantum Mechanics
            </CardTitle>
            <CardDescription className="mt-1">
              with Dr. Eliza Harper
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 border-t">
            <p className="text-sm leading-5">
              <span className="font-medium">Duration:</span>8 weeks
            </p>
            <p className="text-sm leading-5 mt-2">
              An introductory course to the fundamental principles of quantum
              mechanics. No prior knowledge required.
            </p>
          </CardContent>
          <CardFooter className="p-6 bg-gray-50 flex items-center justify-end border-t">
            <Button className="bg-[#2a4185]">Enroll</Button>
          </CardFooter>
        </Card>

        <Card className="w-full max-w-sm mb-8 md:mb-0 rounded-xl border">
          <CardHeader className="p-6">
            <CardTitle className="text-lg md:text-xl text-[#2a4185] font-semibold">
              Introduction to Quantum Mechanics
            </CardTitle>
            <CardDescription className="mt-1">
              with Dr. Eliza Harper
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 border-t">
            <p className="text-sm leading-5">
              <span className="font-medium">Duration:</span>8 weeks
            </p>
            <p className="text-sm leading-5 mt-2">
              An introductory course to the fundamental principles of quantum
              mechanics. No prior knowledge required.
            </p>
          </CardContent>
          <CardFooter className="p-6 bg-gray-50 flex items-center justify-end border-t">
            <Button className="bg-[#2a4185]">Enroll</Button>
          </CardFooter>
        </Card>
      </div>

      <div className="text-center pt-9">
        <h3>For more such fun courses click below to view more such content</h3>
        <div className="mt-6">
          <Link href="/courses">
            <Button className="bg-[#2a4185]">View More Courses</Button>
          </Link>
        </div>
      </div>

      <h2 className="text-center text-3xl md:text-5xl font-semibold text-[#eb5f9e] mt-20">
        Give their boundless potential unlimited access
      </h2>

      <div className="flex flex-col md:flex-row mx-auto max-w-7xl justify-center items-center pt-10 md:pt-20">
        <div className="mb-8 pr-10 md:mb-0 w-full md:w-1/3 flex justify-center items-end">
          <Card className="w-full max-w-sm rounded-xl border h-full">
            <CardHeader className="flex flex-col items-center">
              <div className="flex flex-col items-center">
                <CardTitle className="text-xl md:text-2xl text-[#2a4185] font-bold tracking-tighter">
                  Premium
                </CardTitle>
                <CardDescription className="mt-1 text-sm leading-none">
                  $29/month
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="grid gap-4 text-sm justify-items-center">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4" />
                <span>Unlimited access to all content</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4" />
                <span>Offline reading and listening</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4" />
                <span>Exclusive newsletter subscription</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2 p-6 bg-gray-50 border-t">
              <Button className="bg-[#2a4185]">Subscribe</Button>
              <Button variant="outline">Trial</Button>
            </CardFooter>
          </Card>
        </div>
        <div className="w-full md:w-2/3 px-4 md:px-0">
          <p className="text-lg md:text-xl text-[#2a4185] mb-8">
            Embark on an enriching learning journey with our Premium Plan,
            offering unlimited access to a vast array of educational courses
            tailored to suit your interests and goals. Dive deep into diverse
            subjects, from mathematics to literature, and engage with
            interactive content curated by experts. Stay ahead of the curve with
            regular updates and enjoy the flexibility to learn at own pace,
            anytime, anywhere. Join today to unlock a world of knowledge
          </p>
          <div className="mb-8">
            <p className="text-lg md:text-xl text-[#2a4185] mb-4">
              To view more such plans, click below
            </p>
            <Button className="bg-[#2a4185]">View Subscriptions</Button>
          </div>
        </div>
      </div>

      <footer className=" py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="space-y-4 text-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Frequently Asked Questions
              </h2>
            </div>
            <div>
              <p className="text-base">
                Have a question? Check out our FAQ for the answer.
              </p>
            </div>
          </div>
          <div className="grid gap-4 md:gap-6 lg:gap-8">
            <div className="border-t border-b py-4">
              <details className="border-b pb-4">
                <summary className="flex items-center gap-2 text-lg font-medium">
                  How does the subscription model work?
                </summary>
                <div className="pt-4 space-y-4 text-base leading-loose text-gray-500 dark:text-gray-400">
                  <p className="text-gray-500 dark:text-gray-400">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
              </details>
            </div>
            <div className="border-t border-b py-4">
              <details className="border-b pb-4">
                <summary className="flex items-center gap-2 text-lg font-medium">
                  Can I access course materials after my subscription ends?
                </summary>
                <div className="pt-4 space-y-4 text-base leading-loose text-gray-500 dark:text-gray-400">
                  <p className="text-gray-500 dark:text-gray-400">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
              </details>
            </div>
            <div className="border-t border-b py-4">
              <details className="border-b pb-4">
                <summary className="flex items-center gap-2 text-lg font-medium">
                  Are the courses accredited?
                </summary>
                <div className="pt-4 space-y-4 text-base leading-loose text-gray-500 dark:text-gray-400">
                  <p className="text-gray-500 dark:text-gray-400">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
              </details>
            </div>
            <div className="border-t border-b py-4">
              <details className="border-b pb-4">
                <summary className="flex items-center gap-2 text-lg font-medium">
                  How can I reset my password?
                </summary>
                <div className="pt-4 space-y-4 text-base leading-loose text-gray-500 dark:text-gray-400">
                  <p className="text-gray-500 dark:text-gray-400">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
              </details>
            </div>
            <div className="border-t border-b py-4">
              <details className="border-b pb-4">
                <summary className="flex items-center gap-2 text-lg font-medium">
                  Can I enroll in multiple courses at the same time?
                </summary>
                <div className="pt-4 space-y-4 text-base leading-loose text-gray-500 dark:text-gray-400">
                  <p className="text-gray-500 dark:text-gray-400">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </div>
      </footer>

      <footer className="border-t py-6 w-full shrink-0 flex flex-col md:flex-row justify-center items-center px-4 md:px-6">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Acme Inc. All rights reserved.
        </p>
        <nav className="mt-4 md:mt-0 md:ml-auto flex gap-4 md:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Privacy
          </Link>
        </nav>
      </footer>
    </main>
  );
}
