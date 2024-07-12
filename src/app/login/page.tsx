"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setbuttonDisabled] = useState(false);
  const [loading, setlLoading] = useState(false);

  const onLogin = async () => {
    try {
      setlLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("login successfull", response.data);
      router.push("/profile");
      console.log("login successfull", response.data);
      toast.success(`Welcome back ${response.data.username}`);
    } catch (error: any) {
      console.log("login failed");
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setbuttonDisabled(false);
    } else {
      setbuttonDisabled(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col justify-center py-[4vw] mr-[40vw] ml-[40vw] mt-[10vw] mb-[20vw] rounded bg-black ">
      <h1 className="text-4xl font-semibold tracking-tight lg:text-5xl mb-[2vw] text-white">
        {loading ? `Checking credentials` : "Login"}
      </h1>
      <hr />
      <label
        className="text-white font-normal text-2xl tracking-tight text-normal py-[1vw] p"
        htmlFor=" email"
      >
        Email
      </label>
      <input
        className="p-2 border bg-white border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black py-2"
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label
        className="text-white font-light tracking-tight text-2xl py-[1vw]"
        htmlFor="password"
      >
        Password
      </label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black py-2 bg-white"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
          onClick={onLogin}
          className="mt-[2vw] w-full p-2 border border-gray-300 rounded-full mb-4 focus:outline-none focus:border-gray-600 text-white hover:bg-white hover:text-black font-semibold"
        >
          {buttonDisabled ? "Please fill all fields" : "Login"}
        </button>
      <div className="flex flex-col items-center">
        <p className="text-white">New user?</p>
        <Link className="text-white " href="/sign-up">
          SignUp
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
