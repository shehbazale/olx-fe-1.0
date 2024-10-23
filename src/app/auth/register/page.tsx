"use client";
import UserRegister from "@/app/utils/register";
import Link from "next/link";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
export default function Register() {
  const [name, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const registerUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const userInfo = { name, email, password };
    const result = await UserRegister(userInfo);

    try {
      if (result) {
        toast.success("Registration Success");
        setFullname("");
        setEmail("");
        setPassword("");
      } else {
        toast.error("Failed to Registered");
      }
    } catch (e) {
      toast.error("An error occurred. Please try again.");
      console.log(e);
    }
  };
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="flex justify-center">
              <img src="/log.png" className="w-16" />
            </div>
            <div className="flex flex-col items-center">
              <div className="w-full flex-1 mt-8">
                {/* <>
                  <div className="mx-auto h-48 w-48 flex justify-center items-center shadow-lg rounded-2xl"></div>
                </> */}

                <>
                  <div className="flex flex-col items-center">
                    <h2 className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-green-100 text-gray-800 flex items-center justify-center mb-8">
                      <span>Sign Up</span>
                    </h2>
                  </div>
                  <form onSubmit={registerUser}>
                    <div className="mx-auto max-w-xs">
                      <input
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="text"
                        placeholder="Fullname"
                        value={name}
                        onChange={(e) => setFullname(e.target.value)}
                      />

                      <input
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <input
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />

                      <button
                        type="submit"
                        className="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                      >
                        <svg
                          className="w-6 h-6 -ml-2"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                          <circle cx="8.5" cy="7" r="4" />
                          <path d="M20 8v6M23 11h-6" />
                        </svg>
                        <span className="ml-4">Register</span>
                      </button>
                    </div>
                  </form>
                  <Link href="/auth/login">
                    <p className="mt-6 text-lg font-bold text-gray-600 text-center">
                      <button className="border-b border-gray-500 border-dotted">
                        Login
                      </button>
                    </p>
                  </Link>
                </>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-green-100 text-center hidden lg:flex justify-center">
            <div
              className="m-6 xl:m-8 w-72 bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage: "url('/log.png')",
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
