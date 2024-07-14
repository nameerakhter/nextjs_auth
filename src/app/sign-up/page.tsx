"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignupPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setbuttonDisabled] = useState(false);
  const [loading, setlLoading] = useState(false);

  const onSignUp = async () => {
    try {
      setlLoading(true);
      const response = await axios.post("/api/users/sign-up", user);
      console.log("signup successfull", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("signup failed");
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setbuttonDisabled(false);
    }else{
    setbuttonDisabled(true);}
  }, [user]);
  return (
    <div className="flex flex-col justify-center py-[4vw] mr-[40vw] ml-[40vw] mt-[10vw] mb-[20vw] rounded bg-black ">
      <h1 className="text-4xl font-semibold tracking-tight lg:text-5xl mb-[2vw] text-white ">
        {loading ? "Processing" : "SignUp"}
      </h1>
      <hr />
      <label
        className="text-white font-normal text-2xl tracking-tight text-normal py-[1vw] p"
        htmlFor="username"
      >
        Username
      </label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />
      <label
        className="text-white font-normal text-2xl tracking-tight text-normal py-[1vw] p"
        htmlFor="email"
      >
        Email
      </label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label
        className="text-white font-normal text-2xl tracking-tight text-normal py-[1vw] p"
        htmlFor="password"
      >
        Password
      </label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button onClick={onSignUp} className="mt-[2vw] p-2 border border-gray-300 rounded-full mb-4 focus:outline-none focus:border-gray-600 text-white hover:bg-white hover:text-black">
        {buttonDisabled ? "Please fill all fields to signup": "Signup"}
      </button>
      <div className="flex flex-col items-center w-full">
      
      <Link className="text-white" href="/login">Already an existing user?</Link>
    </div>
      </div>
      
  );
};

export default SignupPage;
