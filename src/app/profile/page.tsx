"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CgProfile } from "react-icons/cg";

import { set } from "mongoose";
import Link from "next/link";

const ProfilePage = () => {
  const router = useRouter();
  const [data, setdata] = useState("nothing");
  const getUserDetails = async () => {
    try {
      const response = await axios.post("/api/users/profile");
      console.log(response);
      setdata(response.data.data.username);
      const isAdmin = response.data.data.isAdmin;
      if(!isAdmin){
        toast.success(`User details fetched successfully`);

      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    try {
      const response = await axios.post("/api/users/logout");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center py-2 min-h-screen">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-white ">
        Profile Page
      </h1>
      <hr />
      <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-white ">
        {data === "nothing" ? (
          "Click the button below to get your details"
        ) : (
          <div>
            <CgProfile
              className="bg-black text-white text-[10vw] cursor-pointer"
              onClick={getUserDetails}
            />

            <Link href={`/profile/${data}`}>{data}</Link>
          </div>
        )}
      </h2>
      <hr />
      <div className="flex flex-col items-center space-y-[30vw]">
        <button
          onClick={getUserDetails}
          className="p-2 border bg-red-500 rounded-xl mb-4 focus:outline-none text-white"
        >
          Get user details
        </button>
        <button
          onClick={logout}
          className="p-2 border bg-blue-500 rounded-xl focus:outline-none text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
