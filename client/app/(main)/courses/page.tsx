"use client";

import React, { useState, useEffect, ReactNode } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter, Card } from "@/components/ui/card";
import { useAuth } from "@/app/context/Auth";
import Eduimg1 from "@/public/images/course-image.png";
import { useRouter } from "next/navigation";
import { baseURL } from "@/app/api/api";

interface Course {
  id: any;
  description: ReactNode;
  price: ReactNode;
  title: ReactNode;
  name: ReactNode;
}

const Page = () => {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3); // Number of items per page
  const { authState } = useAuth();
  const role = authState.user.role;

  useEffect(() => {
    getCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]); // Reload courses when currentPage changes

  const getCourses = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/v1/course/get-all-courses?page=${currentPage}&limit=${itemsPerPage}`
      );
      setCourses(response.data.data);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  console.log(courses);
  console.log(currentPage)

  return (
    <div className="p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-6xl font-bold flex justify-center items-center m-4 text-[#2a4185] tracking-tighter sm:text-6xl ">
          Courses
        </h1>
        {role === "Educator" && (
          <Link
            href="/create-course"
            className="flex justify-center items-center m-4"
          >
            <Button className="flex justify-end items-center rounded-xl">
              + Create New Course
            </Button>
          </Link>
        )}
        {courses ? (
          courses.map((course) => (
            <div
              className="flex flex-col justify-center m-4 items-center gap-6 pt-2 md:gap-8"
              key={course.id}
            >
              <Card className="max-w-4xl">
                <div className="flex justify-evenly items-center">
                  <CardContent className="flex flex-col gap-2">
                    <h3 className="text-xl font-semibold">{course.title}</h3>
                    <p className="text-sm leading-none text-gray-500 dark:text-gray-400">
                      {course.description}
                    </p>
                    <p className="text-sm leading-none">
                      Educator: Prof. {course.name}
                    </p>
                    <p className="text-2xl font-semibold">Rs.{course.price}</p>
                  </CardContent>
                  <Image src={Eduimg1} height={100} width={400} alt="image" />
                </div>
                <CardFooter>
                  <Button
                    size="lg"
                    className="w-full"
                    onClick={() => {
                      router.push(`/courses/${course.id}`);
                    }}
                  >
                    Enroll
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))
        ) : (
          <div>No courses available</div>
        )}
        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <Button
            onClick={() => paginate(currentPage - 1)} // Go to previous page
            className="mx-1"
          >
            Previous
          </Button>
          <div className="bg-slate-200 text-black rounded-sm">
          <p className="m-2 mx-2">{currentPage}</p>
          </div>
          <Button
            onClick={() => paginate(currentPage + 1)} // Go to next page
            className="mx-1 "
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
