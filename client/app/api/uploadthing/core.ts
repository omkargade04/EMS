import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { useAuth } from "@/app/context/Auth";

const f = createUploadthing();

// Define a custom hook to handle authentication
const useAuthenticatedUser = () => {
  // Call useAuth within a custom hook
  const  authState  = useAuth();
  return authState.authState; // Return the user object
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    // Set permissions and file types for this FileRoute
    .middleware(() => {
      // Call the custom hook to get the authenticated user
      const user = useAuthenticatedUser();
      return user ? user.authState?.fk_educator : null; // Access the educator_id from the user object
    })
    .onUploadComplete(() => {}),
  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(() => {
      // Call the custom hook to get the authenticated user
      const user = useAuthenticatedUser();
      return user ? user.authState?.fk_educator  : null; // Access the educator_id from the user object
    })
    .onUploadComplete(() => {}),
  chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "512GB" } })
    .middleware(() => {
      // Call the custom hook to get the authenticated user
      const user = useAuthenticatedUser();
      return user ? user.authState?.fk_educator  : null; // Access the educator_id from the user object
    })
    .onUploadComplete(() => {}),
} as FileRouter;

export type OurFileRouter = typeof ourFileRouter;
