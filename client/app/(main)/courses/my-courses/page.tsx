"use client";

import React, { useEffect, useState } from "react";
import { baseURL } from "@/app/api/api";
import axios from "axios";
import { course } from "@/type";
import { useAuth } from "@/app/context/Auth";
import {
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Eduimg1 from "@/public/images/course-image.png";


const page = () => {
  // const data = await getData();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [courses, setCourses] = useState<course[]>([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { authState } = useAuth();
  console.log(authState);
  const role = authState.user.role;
  const token = authState.token;
  const getCoursesData = async () => {
    try {
      console.log("enetered");
      console.log(token);
      const response = await axios.get(
        `${baseURL}/v1/educator/get-my-courses`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCourses(response.data.data);
      console.log("Data: ", response.data.data);
    } catch (err) {
      console.log("Error: ", err);
    }
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const getStudentCourses = async () => {
    try {
      console.log("enetered");
      console.log(token);
      const response = await axios.get(`${baseURL}/v1/student/get-my-courses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCourses(response.data.data);
      console.log("Data: ", response.data.data);
    } catch (err) {
      console.log("Error: ", err);
    }
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getCoursesData();
    getStudentCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState]);
  return (
    <div>
      <h1 className="text-6xl font-bold flex justify-center items-center m-4 text-[#2a4185] tracking-tighter sm:text-6xl ">
        Your Courses
      </h1>

      {role === "Educator" && courses && (
        <div className="p-6">
          {courses &&
            courses.map((course) => (
              // eslint-disable-next-line react/jsx-key
              <div className="flex flex-col justify-center m-4 items-center gap-6 pt-2 md:gap-8">
                <Card className="">
                  <div className="flex justify-evenly items-center">
                    <CardContent className="flex flex-col gap-2">
                      <h3 className="text-xl font-semibold">{course.title}</h3>
                      <p className="text-sm leading-none text-gray-500 dark:text-gray-400">
                        {course.description}
                      </p>
                      <p className="text-sm leading-none">
                        Educator: Prof. {course.name}
                      </p>
                      <p className="text-2xl font-semibold">${course.price}</p>
                    </CardContent>
                    <Image src={Eduimg1} height={100} width={400} alt="image" />
                  </div>
                  <CardFooter>
                    <Button
                      size="lg"
                      className="w-full"
                      onClick={() => {
                        router.push(`/create-course/${course.id}`);
                      }}
                    >
                      View
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
        </div>
      )}
      {courses &&
        courses.map((course) => (
          // eslint-disable-next-line react/jsx-key
          <div className="flex flex-col justify-center m-4 items-center gap-6 pt-2 md:gap-8">
            <Card className="">
              <div className="flex justify-evenly items-center">
                <CardContent className="flex flex-col gap-2">
                  <h3 className="text-xl font-semibold">{course.title}</h3>
                  <p className="text-sm leading-none text-gray-500 dark:text-gray-400">
                    {course.description}
                  </p>
                  <p className="text-sm leading-none">
                    Educator: Prof. {course.name}
                  </p>
                  <p className="text-2xl font-semibold">${course.price}</p>
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
                  View
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
    </div>
  );
};

export default page;
