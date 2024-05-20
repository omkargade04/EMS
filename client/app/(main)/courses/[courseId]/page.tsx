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

  const { authState } = useAuth();
  const token = authState.token;

  const onClick = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post(
        `${baseURL}/v1/student/checkout/${params.courseId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const response2 = await axios.post(
        `${baseURL}/v1/student/purchase-course/${params.courseId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("This is response", response);
      console.log("This is response", response2);
      toast.success(response2.data.message);
      window.location.assign(response.data.url);
      toast.success(response.data.message);
    } catch {
      toast.error("Something went wrong");
    }
  };

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
            <h2 className="text-3xl text-[#2a4185] font-bold tracking-tighter">
              Introduction to {course.title}
            </h2>
            <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Description: {course.description}
            </p>
            <div className="flex items-center gap-4 md:gap-8">
              <div className="flex flex-col gap-1">
                <span className="text-xl font-semibold text-[#2a4185]">
                  Instructor
                </span>
                <span>Prof. {course.name}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xl font-semibold text-[#2a4185]">
                  Price
                </span>
                <span>Rs. {course.price}</span>
              </div>
            </div>
            <div>
              {chapter && (
                <div className="">
                  <h2 className="text-xl text-black m-3 flex items-center justify-center">
                    Chapters List
                  </h2>
                  <div className="relative flex justify-center items-center">
                    <button
                      className=" text-white text-xl flex items-center justify-center border bg-[#2a4185] hover:bg-[#2a4185]/90 border-white rounded-md hover:cursor-pointer py-2 px-4"
                      onClick={() => {
                        const chapterDropdown =
                          document.getElementById("chapterDropdown");
                        if (chapterDropdown) {
                          chapterDropdown.classList.toggle("hidden");
                        }
                      }}
                    >
                      View Chapters
                    </button>
                    <div
                      id="chapterDropdown"
                      className="hidden m-4 absolute bg-white text-black border border-gray-300 py-2 mt-2 rounded-md shadow-lg w-full"
                    >
                      <ul>
                        {chapter.map((chapter) => (
                          <li
                            key={chapter.chapter_id}
                            className="hover:bg-[#2a4185] hover:text-white cursor-pointer my-1 px-4 py-2 rounded"
                            onClick={() => {
                              const chapterDropdown =
                                document.getElementById("chapterDropdown");
                              if (chapterDropdown) {
                                chapterDropdown.classList.toggle("hidden");
                              }
                            }}
                          >
                            {chapter.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
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
              <CardHeader className="p-4 text-[#2a4185]">
                <CardTitle>Introduction to {course.title}</CardTitle>
                <div>Description: {course.description}</div>
              </CardHeader>
            </Card>
            <div className="flex flex-col gap-2 md:gap-4">
              <Button
                size="lg"
                className="text-xl bg-[#2a4185] hover:bg-[#2a4185]/90"
                onClick={onClick}
                disabled={isLoading}
              >
                Purchase
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
