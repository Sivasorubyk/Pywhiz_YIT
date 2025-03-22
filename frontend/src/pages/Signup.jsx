import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import image from "../assets/signup.png";
import "@fontsource/inknut-antiqua";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-[#D0F0FF] to-[#004D40] p-4">
      <div className="flex w-full max-w-6xl flex-col overflow-hidden rounded-3xl backdrop-blur-sm md:flex-row-reverse">
        {/* Right side - Image */}
        <div className="relative w-full md:w-2/3">
          <div className="relative h-full min-h-[300px] grow-2 overflow-hidden rounded-3xl md:min-h-[10vh]">
            <img
              src={image}
              alt="Python Programming"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Left side - Signup Form */}
        <div className="flex w-full md:w-1/2 bg-white/10 h-[60vh] items-center justify-center p-6 mt-[15vh] rounded-l-2xl">
          <div className="mx-auto w-full max-w-md">
            <h1 className="mb-8 text-center text-4xl font-bold text-gray-800 font-[sora]">
              Sign Up
            </h1>

            <div className="mb-6 space-y-6">
              {/* Username Input */}
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  className="peer w-full border-b-2 border-[#000000] bg-transparent py-2 pl-2 pr-10 text-black focus:outline-none placeholder-transparent"
                  placeholder="Enter your username"
                />
                <label
                  htmlFor="username"
                  className="absolute left-2 -top-3 text-sm text-[#000000] transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-black"
                >
                  Username
                </label>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <User className="h-5 w-5 text-black" />
                </div>
              </div>

              {/* Email Input */}
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  className="peer w-full border-b-2 border-[#000000] bg-transparent py-2 pl-2 pr-10 text-black focus:outline-none placeholder-transparent"
                  placeholder="Enter your email"
                />
                <label
                  htmlFor="email"
                  className="absolute left-2 -top-3 text-sm text-[#000000] transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-black"
                >
                  Email
                </label>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <Mail className="h-5 w-5 text-black" />
                </div>
              </div>

              {/* Password Input */}
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="peer w-full border-b-2 border-black bg-transparent py-2 pl-2 pr-10 text-black focus:outline-none placeholder-transparent"
                  placeholder="Enter your password"
                />
                <label
                  htmlFor="password"
                  className="absolute left-2 -top-3 text-sm text-black transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-black"
                >
                  Password
                </label>

                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <Lock className="h-5 w-5 text-black" />
                  ) : (
                    <Lock className="h-5 w-5 text-black" />
                  )}
                </div>
              </div>
            </div>

            {/* Signup Button with Custom Font */}
            <button
              type="submit"
              className="mt-8 w-full rounded-full bg-[#004D40] py-3 text-center text-xl font-semibold text-white shadow-lg hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-[dm-sans]"
            >
              Sign Up
            </button>

            {/* Links */}
            <div className="mt-6 flex justify-between text-sm">
              <a
                href="#"
                className="text-[#004D40] hover:text-black"
                onClick={handleLogin}
              >
                Already have an account?
              </a>
              <a
                href="#"
                className="text-[#004D40] hover:text-black"
                onClick={handleForgotPassword}
              >
                Forgot password?
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
