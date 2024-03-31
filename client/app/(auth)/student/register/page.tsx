"use client";

import { toast } from "sonner";
import { useState } from "react";
import { UserRegisterForm } from "@/type";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import registerImage from "@/public/images/register.png";

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
import { studentSignup } from "@/app/api/auth";

const BASEURL = process.env.NEXT_PUBLIC_BASEURL;

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [userData, setUserData] = useState<UserRegisterForm>({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  const handleSubmit = async () => {
    const name = userData.name;
    const email = userData.email;
    const role = userData.role;
    const password = userData.password;

    console.log("User Name: ",name);
    console.log("User email: ",email);
    console.log("User password: ",password);

    if (!name || !email || !password || !role) {
      toast.error("All fields required");
      return;
    }

    try {
      const response = await studentSignup(name, email, role, password);
      console.log("This is reposne: ",response)
      toast.success(response.message);
      router.push("/login");
    } catch (err: any) {
    //   toast.error(err.response.message);
      console.log("Error", err);
    }
  };

  return (
    <main className="bg-[#5865F2] flex justify-center items-center h-screen">
      <Card className="w-3/4 sm:w-1/2 p-2 lg:p-8 rounded-xl bg-[#3f4146] text-white border border-[#313338] flex justify-center items-center">
        <div className="lg:border-r lg:border-r-[#aaafbc] lg:pr-8">
          <CardHeader className="mb-5 flex justify-center items-center ">
            <CardTitle className="mb-2">Student Register</CardTitle>
            <CardDescription className="text-sm text-center">
              Create an Account to join{" "}
              <span className="text-[#7c87ff]">courses</span>!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-4">
                  <div className="">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Full Name"
                      className="mt-2 bg-[#3f4146] border border-gray-400 rounded-xl placeholder:text-gray-400"
                      value={userData.name}
                      onChange={(e) =>
                        setUserData({ ...userData, name: e.target.value })
                      }
                    />
                  </div>{" "}
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
                    <Label htmlFor="name">Role</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Student"
                      className="mt-2 bg-[#3f4146] border border-gray-400 rounded-xl placeholder:text-gray-400"
                      value={userData.role}
                      onChange={(e) =>
                        setUserData({ ...userData, role: e.target.value })
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
          <CardFooter className="flex flex-col space-y-4 justify-center items-center">
            <Button
              onClick={handleSubmit}
              className="w-full mt-2 rounded-xl bg-[#5865F2] hover:bg-[#434fd0]"
            >
              Register
            </Button>
            <p className="text-xs">
              Already have an account?{" "}
              <span className="text-[#7c87ff]">
                <Link href="/login">Login</Link>
              </span>
            </p>
          </CardFooter>
        </div>
        <div className="md:pl-8 hidden lg:block">
          <div className="space-y-6 flex flex-col justify-center items-center">
            <div className="text-center font-bold text-3xl ">Explore <span className="text-[#7c87ff]">Courses</span></div>
            <Image
              src={registerImage}
              alt="register-image"
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