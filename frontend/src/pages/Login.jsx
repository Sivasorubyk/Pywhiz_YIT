"use client";

import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import image from "../assets/login.png";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 p-4">
      <div className="flex w-full max-w-6xl flex-col overflow-hidden rounded-3x backdrop-blur-sm md:flex-row place-item-center">
        {/* Left side - Image */}
        <div className="relative w-full md:w-2/3">
          <div className="relative h-full min-h-[300px] grow-2 overflow-hidden rounded-3xl md:min-h-[500px]">
            <img
              src={image}
              alt="Python Programming"
              className="object-cover"
            />
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="flex w-full flex-col justify-center p-8 md:w-1/2 bg-white h-[60vh]">
          <div className="mx-auto w-full max-w-md">
            <h1 className="mb-8 text-center text-4xl font-bold text-gray-800">
              Login
            </h1>

            <div className="mb-6 space-y-6">
              {/* Email Input */}
              <div className="relative">
                <label
                  htmlFor="email"
                  className="mb-2 block text-xl font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="relative mt-1">
                  <input
                    type="email"
                    id="email"
                    className="w-full border-b-2 border-gray-300 bg-transparent py-2 pl-2 pr-10 text-gray-700 focus:border-blue-500 focus:outline-none"
                    placeholder="Enter your email"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <Mail className="h-5 w-5 text-gray-500" />
                  </div>
                </div>
              </div>

              {/* Password Input */}
              <div className="relative">
                <label
                  htmlFor="password"
                  className="mb-2 block text-xl font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative mt-1">
                  <input
                    type="password"
                    id="password"
                    className="w-full border-b-2 border-gray-300 bg-transparent py-2 pl-2 pr-10 text-gray-700 focus:border-blue-500 focus:outline-none"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="mt-8 w-full rounded-full bg-blue-900 py-3 text-center text-xl font-semibold text-white shadow-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Login
            </button>

            {/* Links */}
            <div className="mt-6 flex justify-between text-sm">
              <a href="#" className="text-gray-600 hover:text-blue-500">
                Create an account
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-500">
                Forgot password?
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
