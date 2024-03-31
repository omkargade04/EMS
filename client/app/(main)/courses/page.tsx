"use client";

import Image from "next/image";
import { useState, useEffect, ReactNode } from "react";
import axios from "axios";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Course {
  course_description: ReactNode;
  course_price: ReactNode;
  name: ReactNode;
  course_title: ReactNode;
  data:{
    course_id: number;
    course_title: string;
    course_description: string;
    course_price: number;
    name: string;
  }

}

const Page = () => {
  const BASEURL = process.env.NEXT_PUBLIC_BASEURL;
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await axios.get<Course[]>(`${BASEURL}/v1/course/get-all-courses`);
        console.log("Fetched data:", response?.data); // Check the fetched data
        setCourses(response?.data?.data || []);
      } catch (err) {
        console.log("Error: ", err);
      }
    };

    getCourses();
  }, []);

  console.log("Courses:", courses); // Check the courses variable

  return (
    <div className="flex flex-wrap justify-center">
      {courses.map((course, index) => (
        <div key={index} className="w-full md:w-1/3 p-4">
          <Card className="max-w-sm rounded-xl border">
            <CardHeader className="p-6">
              <CardTitle className="text-lg md:text-xl text-[#2a4185] font-semibold">
                {course.course_title}
              </CardTitle>
              <CardDescription className="mt-1">
                with {course.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 border-t">
              <p className="text-sm leading-5">
                <span className="font-medium">Price:</span> $
                {course.course_price}
              </p>
              <p className="text-sm leading-5 mt-2">
                {course.course_description}
              </p>
            </CardContent>
            <CardFooter className="p-6 bg-gray-50 flex items-center justify-end border-t">
              <Button className="bg-[#2a4185]">Enroll</Button>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default Page;
