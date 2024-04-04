"use client";
import React, { useState } from "react";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { baseURL } from "@/app/api/api";
import { toast } from "sonner";
import { useAuth } from "@/app/context/Auth";
import { course } from "@/type";
import Image from "next/image";
import { FileUpload } from "@/components/file-upload";

interface ImageFormProps {
  initialData: course | ""
  courseId: string;
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required",
  }),
});

export const ImageForm = ({
  initialData,
  courseId,
}: ImageFormProps) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isEditing, setIsEditing] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const authState = useAuth();

  const { token } = authState.authState;

  const toggleEdit = () => setIsEditing((current) => !current);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? { imageUrl: initialData?.imageUrl ?? "" } : undefined,
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
        Course Image
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.imageUrl && (
            <div className="h-7  text-sm rounded-md text-black hover:text-slate-700">Add an image</div>
          )}
          {!isEditing && initialData.imageUrl && (
            <div className="h-7  text-sm rounded-md text-black hover:text-slate-700">Edit an image</div>
          )}
        </Button>
      </div>
      {!isEditing && (
        !initialData.imageUrl ? (
          <div className="flex flex-col items-center justify-center h-60 bg-slate-200 rounded-md">
            <div className="h-10 w-10 text-slate-500">
                Image here
            </div>
          </div>
        )
       : (
        // eslint-disable-next-line react/jsx-no-comment-textnodes
        <div className="relative aspect-video mt-2">
          // eslint-disable-next-line @next/next/no-img-element
          <Image alt="Upload" fill className="object-cover rounded-md " src={initialData.imageUrl}/>
          current image
        </div>
       )
      )}
      {isEditing && (
        <div className="">
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if(url) {
                onSubmit({imageUrl: url});
              }
            }}
          />
          <div className="text-xs text-muted-foregtound mt-4"></div>
        </div>
      )}
    </div>
  );
};
