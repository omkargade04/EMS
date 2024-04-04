"use client";

import { baseURL } from "@/app/api/api";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Course } from "@/type";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Eduimg1 from "@/public/images/course-image.png";
import { toast } from "sonner";
import { useAuth } from "@/app/context/Auth";


const Page = () => {
  const params = useParams();
  const [course, setCourse] = useState<Course | null>(null); // Change here
  const [chapter, setChapter] = useState<Course | null>(null); // Change here
  const [isLoading, setIsLoading] = useState(false);

  const getCourseData = async () => {
    try {
      console.log(params.courseId);
      const response = await axios.get(
        `${baseURL}/v1/course/get-a-course/${params.courseId}`
      );
      setCourse(response.data.data);
      console.log("Data: ", response.data.data);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const getChapterData = async () => {
    try {
      console.log(params.courseId);
      const response = await axios.get(
        `${baseURL}/v1/course/get-all-chapters/${params.courseId}`
      );
      setChapter(response.data.data);
      console.log("Data: ", response.data.data);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const {authState} = useAuth()
  const token = authState.token;

  const onClick = async() => {
    try{
      setIsLoading(true);

      const response = await axios.post(`${baseURL}/v1/student/checkout/${params.courseId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      
      const response2 = await axios.post(`${baseURL}/v1/student/purchase-course/${params.courseId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      console.log("This is response", response);
      console.log("This is response", response2);
      toast.success(response2.data.message);
      window.location.assign(response.data.url);
      toast.success(response.data.message);

    }catch{
        toast.error("Something went wrong");
    }
  }

  useEffect(() => {
    getCourseData();
    getChapterData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(course);
  console.log(chapter);

  return (

    //----------------------------------------------------------------------------

    <div className="bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-50">
      <div className="container grid gap-12 px-4 py-8 md:grid-cols-2 md:py-12 lg:px-6">
        {course && (
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-bold tracking-tighter">
              Introduction to {course.title}
            </h2>
            <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Let your child&apos;s creativity shine with this introductory
              course to Scratch, a block-based visual programming language
              created for young learners. They&apos;ll learn to make their own
              interactive stories, games, and animations while gaining essential
              computational thinking skills in a fun and supportive environment.
              Description: {course.description}
            </p>
            <div className="flex items-center gap-4 md:gap-8">
              <div className="flex flex-col gap-1">
                <span className="text-xl font-semibold">Instructor</span>
                <span>Prof. {course.name}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xl font-semibold">Price</span>
                <span>$ {course.price}</span>
              </div>
            </div>
            <div>
              {chapter && (
                <div className="">
                  <h2 className="text-xl text-black flex items-center justify-center">
                    Chapters List
                  </h2>
                  <ul>
                    {chapter.map((chapter) => (
                      <li
                        className="bg-black border text-white text-xl flex items-center justify-center border-white rounded-md hover:cursor-pointer m-2"
                        key={chapter.chapter_id}
                      >
                        <p className="m-2">{chapter.title}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {course && (
          <div className="flex flex-col gap-4 md:gap-2">
            <Card>
              <Image
                alt="Course Image"
                className="aspect-video overflow-hidden object-cover object-center rounded-t-lg"
                height="225"
                src={Eduimg1}
                width="400"
              />
              <CardHeader className="p-4">
                <CardTitle>Introduction to {course.title}</CardTitle>
                <div>
                  Let your child&apos;s creativity shine with this introductory
                  course to Scratch. description: {course.description}
                </div>
              </CardHeader>
            </Card>
            <div className="flex flex-col gap-2 md:gap-4">
              <Button size="lg" className="text-xl" onClick={onClick} disabled={isLoading}>Purchase</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
