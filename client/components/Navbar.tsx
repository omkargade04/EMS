import Link from "next/link";
import { JSX, SVGProps } from "react";

export default function Navbar() {
    return (
      <nav className="bg-white shadow-md dark:bg-gray-50 z-10">
        <div className="w-full max-w-7xl mx-auto">
          <div className="px-4 md:px-6">
            <div className=" flex h-14  justify-between items-center">
              <Link className="flex" href="#">
                <FlagIcon className="h-6 w-6" />
                <span className="text-black">Logo</span>
              </Link>
              <div className="flex space-x-4">
                <Link
                  className="font-medium inline-flex h-9 items-center rounded-md hover:bg-gray-100 hover:text-gray-900 px-4 py-2 transition-colors dark:hover:bg-gray-800 dark:hover:text-gray-50"
                  href="#"
                >
                  Home
                </Link>
                <Link
                  className="font-medium inline-flex h-9 items-center rounded-md hover:bg-gray-100 hover:text-gray-900 px-4 py-2 transition-colors dark:hover:bg-gray-800 dark:hover:text-gray-50"
                  href="#"
                >
                  Courses
                </Link>
                <Link
                  className="font-medium inline-flex h-9 items-center rounded-md hover:bg-gray-100 hover:text-gray-900 px-4 py-2 transition-colors dark:hover:bg-gray-800 dark:hover:text-gray-50"
                  href="#"
                >
                  Subscriptions
                </Link>
                <Link
                  className="font-medium inline-flex h-9 items-center rounded-md hover:bg-gray-100 hover:text-gray-900 px-4 py-2 transition-colors dark:hover:bg-gray-800 dark:hover:text-gray-50"
                  href="#"
                >
                  About
                </Link>
              </div>
              <div>
                  User
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

function FlagIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  );
}
