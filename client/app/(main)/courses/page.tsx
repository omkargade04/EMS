"use client";

import Image from "next/image";
import { useState, useEffect, ReactNode } from "react";
import axios from "axios";
import {
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { baseURL } from "@/app/api/api";
import Eduimg1 from "@/public/images/course-image.png";
import { useAuth } from "@/app/context/Auth";

interface Course {
  id: any;
  description: ReactNode;
  price: ReactNode;
  title: ReactNode;
  course_id: ReactNode;
  course_description: ReactNode;
  course_price: ReactNode;
  name: ReactNode;
  course_title: ReactNode;
  data: {
    course_id: number;
    course_title: string;
    course_description: string;
    course_price: number;
    name: string;
  };
}

const BASEURL = process.env.NEXT_PUBLIC_BASEURL;

const Page = () => {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const {authState} = useAuth();
  const role = authState.user.role
  console.log(role);
  const getCourses = async () => {
    
    try {

      const response = await axios.get(`${baseURL}/v1/course/get-all-courses`);
      setCourses(response.data.data);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  console.log("Courses: ", courses);

  return (
    <div className="p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
      <h1 className="text-6xl font-bold flex justify-center items-center m-4 text-[#2a4185] tracking-tighter sm:text-6xl ">
              Courses
            </h1>
      {role === "Educator" && (
          <Link href="/create-course" className="flex justify-center items-center m-4">
            <Button className="flex justify-end items-center rounded-xl">
              + Create New Course
            </Button>
          </Link>
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
                    Enroll
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Page;
