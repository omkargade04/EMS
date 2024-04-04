"use client";
import React, { useState } from "react";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { baseURL } from "@/app/api/api";
import { toast } from "sonner";
import { useAuth } from "@/app/context/Auth";
import { course } from "@/type";
import ChaptersList from "./chapters-list";

interface ChapterFormProps {
  initialData: {
    chapters: [];
  };
  courseId: string;
}

const formSchema = z.object({
  title: z.string().min(1),
});

export const ChapterForm = ({
  initialData,
  courseId,
}: ChapterFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isEditing, setIsEditing] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const authState = useAuth();

  const { token } = authState.authState;

  const toggleEdit = () => setIsEditing((current) => !current);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "" }
  });

  const { isSubmitting, isValid } = form.formState;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      const response = await axios.post(
        `${baseURL}/v1/course/create-chapters/${courseId}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("This is response: ", response);
      toast.success(response.data.message);
      toggleEdit();
      router.refresh();
    } catch (err) {
      toast.error("Error editing title");
    }
  };
  if (!initialData) {
    return null;
  }
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course chapters
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <div className="h-7  text-sm rounded-md text-black hover:text-slate-700">
                {" "}
                <p className="">Add a chapter</p>
              </div>
            </>
          )}
        </Button>
      </div>
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4 "
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Introduction to the course'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              <Button disabled={!isValid || isSubmitting} type="submit">
                Create
              </Button>
          </form>
        </Form>
      )}
      {!isEditing && (
        <div className={`text-sm mt-2 ${
          !initialData.chapters && "text-white"
        }`}>
        <ChaptersList  courseId={courseId} items={initialData.chapters || []}/>
        </div>
      )}
    </div>
  );
};
