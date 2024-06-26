"use client";

import React, { useEffect, useState } from "react";
import { baseURL } from "@/app/api/api";
import axios from "axios";
import { course } from "@/type";
import { useAuth } from "@/app/context/Auth";
import { CardContent, CardFooter, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Pagination, PaginationContent } from "@/components/ui/pagination";
import Image from "next/image";
import Eduimg1 from "@/public/images/course-image.png";
import Link from "next/link";

const Page = () => {
  const { authState } = useAuth();
  const [courses, setCourses] = useState<course[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3); // Number of items per page
  const router = useRouter();
  const role = authState.user.role;
  const token = authState.token;

  const getCoursesData = async () => {
    const res = role.toLowerCase();
    try {
      const response = await axios.get(
        `${baseURL}/v1/${res}/get-my-courses?page=${currentPage}&limit=${itemsPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response?.data.data);
      setCourses(response?.data.data);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    getCoursesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState, currentPage]); // Reload courses when authState or currentPage changes

  const handlePaginationClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  console.log(courses);
  return (
    <div>
      <h1 className="text-3xl sm:text-4xl font-bold flex justify-center items-center m-4 text-[#2a4185] tracking-tighter  ">
        Your Courses
      </h1>

      {role === "Educator" && (
        <Link
          href="/create-course"
          className="flex justify-center items-center m-4"
        >
          <Button className="flex justify-end items-center rounded-xl bg-[#2a4185]">
            + Create New Course
          </Button>
        </Link>
      )}

      {courses &&
        courses.map((course) => (
          <div
            key={course.id}
            className="flex flex-col justify-center m-4 items-center gap-6 pt-2 md:gap-8"
          >
            <Card className="max-w-4xl">
              <div className="flex justify-evenly items-center">
                <CardContent>
                  <h3 className="text-xl m-2 font-semibold">{course.title}</h3>
                  <p className="text-sm m-2 leading-none text-gray-500 dark:text-gray-400">
                    {String(course.description).slice(0, 100)}....
                  </p>
                  <p className="text-2xl font-semibold">Rs.{course.price}</p>
                </CardContent>
                <Image
                  src={Eduimg1}
                  height={100}
                  width={400}
                  alt="image"
                  className="hidden sm:block"
                />
              </div>
              <CardFooter>
                <Button
                  size="lg"
                  className="w-full bg-[#2a4185] hover:bg-[#2a4185]/90"
                  onClick={() => {
                    router.push(`/courses/${course.id}`);
                  }}
                >
                  View
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}

      <Pagination>
        <Button
          disabled={currentPage === 1}
          className="text-md sm:text-lg text-[#fff] bg-[#2a4185] hover:bg-[#2a4185]/90"
          onClick={() => handlePaginationClick(currentPage - 1)}
        >
          Previous
        </Button>

        <PaginationContent className="text-black px-2">
          {currentPage}
        </PaginationContent>

        <Button
          disabled={courses.length < 2}
          className="text-md sm:text-lg text-[#fff] bg-[#2a4185] hover:bg-[#2a4185]/90"
          onClick={() => handlePaginationClick(currentPage + 1)}
        >
          Next
        </Button>
      </Pagination>
    </div>
  );
};

export default Page;
