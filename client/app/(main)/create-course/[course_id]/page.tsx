"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { baseURL } from "@/app/api/api";
import { useAuth } from "@/app/context/Auth";
import { course } from "@/type";
import { useRouter } from "next/navigation";
import { DescriptionForm } from "./_components/description-form";
import { TitleForm } from "./_components/title-form";
import { ImageForm } from "./_components/image-form";
import { PriceForm } from "./_components/price-form";
import { ChapterForm } from "./_components/chapters-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const params = useParams();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const authState = useAuth();
  const { token } = authState.authState;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [course, setCourse] = useState<course | null>(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getCourse = async () => {
    try {
      console.log(authState)
      const response = await axios.get(
        `${baseURL}/v1/course/get-a-course/${params.course_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("This is response: ", response.data.data);
      setCourse(response.data.data);
    } catch (err: any) {
      router.push("/");
      console.log(err);
    }
  };

  const createCourse = async() => {
    try{
      toast.success("Course created successfully");
    }catch(err){
      console.log("Error", err);
      toast.error("Error creating course");
    }
  }  

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!course) {
    return null; // or loading indicator
  }

  const courseId = Array.isArray(params.course_id)
    ? params.course_id[0]
    : params.course_id;
  const requiredFields = [
    course?.title,
    course?.description,
    course?.price,
  ];
  const totalFields = requiredFields.length;
  const completeFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completeFields}/ ${totalFields})`;

  const isComplete = requiredFields.every(Boolean)

  console.log("course: ", course);
  return (
    <>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Course setup</h1>
            <span className="text-sm text-slate-700">
              Complete all fields {completionText}
            </span>
          </div>
          <div className="">
            <Link href='/courses'><Button onClick={createCourse}>Create Course</Button></Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="">
            <div className="flex items-center gap-x-2">
              <h2 className="text-2xl font-semibold">Customize your course</h2>
            </div>
            <TitleForm initialData={course} courseId={courseId} />
            <DescriptionForm initialData={course} courseId={courseId} />
            <ImageForm initialData={course} courseId={courseId} />

          </div>
          <div className=" space-y-6 ">
            <div className="">
              <div className="flex items-center mb-8  gap-x-2">
                <h2>Course Chapters</h2>
              </div>
              <ChapterForm initialData={course} courseId={courseId} />
            </div>
            <div className="">
              <div className="flex items-center gap-x-2">
                <h2 className="text-xl">Sell your course</h2>
              </div>
              <PriceForm initialData={course} courseId={course.id}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
