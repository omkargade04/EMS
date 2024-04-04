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

interface DescriptionFormProps {
  initialData: {
    description: string;
  };
  courseId: string;
}

const formSchema = z.object({
  description: z.string().min(1, {
    message: "Description is required",
  }),
});

export const DescriptionForm = ({
  initialData,
  courseId,
}: DescriptionFormProps) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isEditing, setIsEditing] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const authState = useAuth();

  const { token } = authState.authState;

  const toggleEdit = () => setIsEditing((current) => !current);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? { description: initialData.description ?? "" } : undefined,
  });

  const { isSubmitting, isValid } = form.formState;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      const response = await axios.patch(
        `${baseURL}/v1/course/update-description-course/${courseId}`,
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
        Course description
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <div className="h-7  text-sm rounded-md text-black hover:text-slate-700">
                {" "}
                <p className="">Edit description</p>
              </div>
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={`text-sm mt-2 ${
            !initialData.description && "text-slate-500 italic"
          }`}
        >
          {initialData.description || "No description"}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4 "
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="e.g. 'This course is about....'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
