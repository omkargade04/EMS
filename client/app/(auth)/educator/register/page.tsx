"use client";

import { toast } from "sonner";
import { useState } from "react";
import { RegisterForm } from "@/type";
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
import { educatorSignup } from "@/app/api/auth";

const BASEURL = process.env.NEXT_PUBLIC_BASEURL;

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [userData, setUserData] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
    role: "",
    institute: "",
    experience: 0,
  });

  const handleSubmit = async () => {
    const name = userData.name;
    const email = userData.email;
    const password = userData.password;
    const role = userData.role;
    const institute = userData.institute;
    const experience = userData.experience;

    if (!name || !email || !password || !role || !institute || !experience) {
      toast.error("All fields required");
      return;
    }

    try {
      const response = await educatorSignup(
        name,
        email,
        role,
        institute,
        experience,
        password
      );
      toast.success(response.message);
      console.log("response:", response);
      router.push("/login");
    } catch (err: any) {
      toast.error(err.response.message);
      console.log("Error", err);
    }
  };

  return (
    <main className=" flex justify-center items-center h-screen bg-[#eb5f9e]">
      <Card className="p-10  rounded-xl bg-[#3f4146] text-white border border-[#313338] flex justify-center items-center">
        <div className="">
          <CardHeader className="mb-5 flex justify-center items-center ">
            <CardTitle className="mb-2">Educator Register</CardTitle>
            <CardDescription className="text-sm text-center">
              Create an Account to create{" "}
              <span className="text-[#eb5f9e]">courses</span>!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
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
                        id="role"
                        type="text"
                        placeholder="Educator"
                        className="mt-2 bg-[#3f4146] border border-gray-400 rounded-xl placeholder:text-gray-400"
                        value={userData.role}
                        onChange={(e) =>
                          setUserData({ ...userData, role: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="">
                      <Label htmlFor="name">Institute</Label>
                      <Input
                        id="institute"
                        type="text"
                        placeholder="Institute"
                        className="mt-2 bg-[#3f4146] border border-gray-400 rounded-xl placeholder:text-gray-400"
                        value={userData.institute}
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            institute: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="">
                      <Label htmlFor="name">Experience</Label>
                      <Input
                        id="experience"
                        type="number"
                        placeholder="Experience"
                        className="mt-2 bg-[#3f4146] border border-gray-400 rounded-xl placeholder:text-gray-400"
                        value={userData.experience.toString()}
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            experience: parseInt(e.target.value)
                          })
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
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 justify-center items-center">
            <Button
              onClick={handleSubmit}
              className="w-full mt-2 rounded-xl bg-[#eb5f9e] hover:bg-[#d04370]"
            >
              Register
            </Button>
            <p className="text-xs">
              Already have an account?{" "}
              <span className="text-[#eb5f9e]">
                <Link href="/login">Login</Link>
              </span>
            </p>
          </CardFooter>
        </div>
      </Card>
    </main>
  );
};

export default page;
