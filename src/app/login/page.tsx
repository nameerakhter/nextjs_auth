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
    if (
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setbuttonDisabled(false);
    }else{
    setbuttonDisabled(true);}
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center py-2 min-h-screen">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-white ">
        {loading ? `Welcome back User` : "Login"}
      </h1>
      <hr />
      <label
        className="text-white font-extrabold tracking-tight text-4xl"
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
        className="text-white font-extrabold tracking-tight text-4xl"
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

      <button onClick={onLogin} className="p-2 border border-gray-300 rounded-full mb-4 focus:outline-none focus:border-gray-600 text-white">
        {buttonDisabled ? "Please fill all feilds": "Login"}
      </button>
      <Link className="text-white" href="/sign-up">New user SignUp here</Link>
    </div>
  );
};

export default LoginPage;
