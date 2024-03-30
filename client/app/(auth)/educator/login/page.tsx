"use client";

import { toast } from "sonner";
import { useState } from "react";
import { LoginForm } from "@/type";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import loginImage from "@/public/images/login.png";

// ui components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { educatorLogin } from "@/app/api/auth";
import { useAuth } from "@/app/context/EducatorAuth";

const BASEURL = process.env.NEXT_PUBLIC_BASEURL;

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { setEducatorAuthInfo } = useAuth();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [userData, setUserData] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    const email = userData.email;
    const password = userData.password;

    if (!email || !password) {
      toast.error("All fields required");
      return;
    }

    try {
      const response = await educatorLogin(email, password);
      console.log("This is reposne: ",response)
      toast.success(response.message);
      setEducatorAuthInfo(response);
    //   console.log("response:", response);
      router.push("/");
    } catch (err: any) {
      toast.error(err.response.message);
      console.log("Error", err);
    }
  };


  return (
    <main className="bg-[#5865F2] flex justify-center items-center h-screen">
      <Card className="w-3/4 sm:w-1/2 p-2 lg:p-8 rounded-xl bg-[#3f4146] text-white border border-[#313338] flex justify-center items-center">
        <div className="lg:border-r lg:border-r-[#aaafbc] lg:pr-8">
          <CardHeader className="lg:mb-5 flex justify-center items-center ">
            <CardTitle className="mb-2">Educator Login</CardTitle>
            <CardDescription className="text-sm text-center">
              Welcome back to{" "}
              <span className="text-[#7c87ff]">Website</span>!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-2">
                  <div className="">
                    <Label htmlFor="name">Email Address</Label>
                    <Input
                      id="name"
                      type="email"
                      placeholder="Email Address"
                      className="mt-2 bg-[#3f4146] border border-gray-400 rounded-xl placeholder:text-gray-400"
                      value={userData.email}
                      onChange={(e) =>
                        setUserData({ ...userData, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="">
                    <Label htmlFor="name">Password</Label>
                    <Input
                      id="name"
                      type="password"
                      placeholder="Password"
                      className="mt-2 bg-[#3f4146] border border-gray-400 rounded-xl placeholder:text-gray-400"
                      value={userData.password}
                      onChange={(e) =>
                        setUserData({ ...userData, password: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="lg:mb-4 flex flex-col space-y-2 justify-center items-center">
            <Button
              onClick={handleSubmit}
              className="w-full rounded-xl bg-[#5865F2] hover:bg-[#434fd0]"
            >
              Login
            </Button>
            <p className="text-xs">
              Dont have an account?{" "}
              <span className="text-[#7c87ff]">
                <Link href="/educator/register">Register</Link>
              </span>
            </p>
          </CardFooter>
        </div>
        <div className="lg:pl-8 hidden lg:block">
          <div className="space-y-6 flex flex-col justify-center items-center">
            <div className="text-center flex flex-col justify-center items-center font-bold text-3xl ">
              {" "}
              Create New<span className="text-[#7c87ff]">Courses!</span>
            </div>
            <Image
              src={loginImage}
              alt="login-image"
              height={300}
              width={300}
              className=" border rounded-xl"
            />
          </div>
        </div>
      </Card>
    </main>
  );
};

export default page;