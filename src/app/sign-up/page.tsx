"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const signupPage = () => {
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
    <div className="flex flex-col items-center justify-center py-2 min-h-screen">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-white ">
        {loading ? "Processing" : "SignUp"}
      </h1>
      <hr />
      <label
        className="text-white font-extrabold tracking-tight text-4xl"
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
        className="text-white font-extrabold tracking-tight text-4xl"
        htmlFor="username"
      >
        Email
      </label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="text"
        id="username"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="username"
      />
      <label
        className="text-white font-extrabold tracking-tight text-4xl"
        htmlFor="username"
      >
        Password
      </label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="password"
        id="username"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="username"
      />

      <button onClick={onSignUp} className="p-2 border border-gray-300 rounded-full mb-4 focus:outline-none focus:border-gray-600 text-white">
        {buttonDisabled ? "Please fill all feilds": "Signup"}
      </button>
      <Link className="text-white" href="/login">Already an existing user</Link>
    </div>
  );
};

export default signupPage;
