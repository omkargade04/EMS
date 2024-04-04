"use client";

import { baseURL } from '@/app/api/api';
import { Course } from '@/type';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface ChaptersListProps {
    items: [],
    courseId: string,
}

const ChaptersList = ({
    items,
    courseId,
}: ChaptersListProps) => {

    // const [isMounted, setIsMounted] = useState(false);
    // const [chapters, isChapters] = useState(items);

    // useEffect(() => {
    //     setIsMounted(true);
    //   }, []);

    //   if(!isMounted){
    //     return null;
    //   }

// -------------------

// eslint-disable-next-line react-hooks/rules-of-hooks
const [courses, setCourses] = useState<Course[]>([]);

  const getCourses = async () => {
    try {
      const response = await axios.get(`${baseURL}/v1/course/get-all-chapters/${courseId}`);
      setCourses(response.data.data);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getCourses();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("Courses: ", courses);
//   --------------------------
  return (
    <div>
    <h2 className='text-xl text-black flex items-center justify-center'>Chapters List</h2>
    <ul>
        {courses.map((chapter) => (
            <li className="bg-slate-500 border flex items-center justify-center border-white rounded-md hover:cursor-pointer m-2" key={chapter.chapter_id}><p className='m-2'>{chapter.title}</p></li>
        ))}
    </ul>
</div>
  )
}

export default ChaptersList