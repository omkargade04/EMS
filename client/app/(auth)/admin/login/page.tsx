"use client";

import { toast } from "sonner";
import { useState } from "react";
import { AdminLoginForm } from "@/type";
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
import { useAuth } from "@/app/context/Auth";
import { adminLogin } from "@/app/api/auth";

const BASEURL = process.env.NEXT_PUBLIC_BASEURL;

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { setUserAuthInfo } = useAuth();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [userData, setUserData] = useState<AdminLoginForm>({
    name: "",
    password: "",
  });

  const handleSubmit = async () => {
    const name = userData.name;
    const password = userData.password;

    console.log("User email: ", name);
    console.log("User password: ", password);

    if (!name || !password) {
      toast.error("All fields required");
      return;
    }

    try {
      const response = await adminLogin(name, password);
      console.log("This is reposne: ", response);
      setUserAuthInfo(response);
      toast.success(response.message);
      router.push("/");
    } catch (err: any) {
      toast.error(err.response.message);
      console.log("Error", err);
    }
  };

  return (
    <main className="flex justify-center items-center h-screen">
      <Card className="w-3/4 sm:w-1/2 p-2 lg:p-8 rounded-xl bg-[#3f4146] text-white border border-[#313338] flex justify-center items-center">
        <div className="lg:border-r lg:border-r-[#aaafbc] lg:pr-8">
          <CardHeader className="lg:mb-5 flex justify-center items-center ">
            <CardTitle className="mb-2">Admin</CardTitle>
            <CardDescription className="text-sm text-center">
              Welcome to <span className="text-[#eb5f9e]">Admin Panel</span>!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-2">
                  <div className="">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Name"
                      className="mt-2 bg-[#3f4146] border border-gray-400 rounded-xl placeholder:text-gray-400"
                      value={userData.name}
                      onChange={(e) =>
                        setUserData({ ...userData, name: e.target.value })
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
              className="w-full rounded-xl bg-[#eb5f9e] hover:bg-[#d04370]"
            >
              Login
            </Button>
            <div className="flex-col">
              <p className="text-xs m-2">
                Dont have an admin account?{" "}
                <span className="text-[#eb5f9e]">
                  <Link href="/admin/register">Register</Link>
                </span>
              </p>
            </div>
          </CardFooter>
        </div>
        <div className="lg:pl-8 hidden lg:block">
          <div className="space-y-6 flex flex-col justify-center items-center">
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
function adminlogin(name: string, password: string) {
    throw new Error("Function not implemented.");
}

