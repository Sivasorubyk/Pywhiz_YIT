import { useState } from "react";
import { Mail, Lock, KeyRound } from "lucide-react"; // Added KeyRound icon
import { useNavigate } from "react-router-dom";
import image from "../assets/signup.png";
import "@fontsource/inknut-antiqua";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSendOtp = () => {
    console.log("OTP sent to:", email);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-[#D0F0FF] to-[#A3DAFF] p-4">
      <div className="flex w-full max-w-6xl flex-col overflow-hidden rounded-3xl backdrop-blur-sm md:flex-row-reverse">
        {/* Right side - Image */}
        <div className="relative w-full md:w-2/3">
          <div className="relative h-full min-h-[300px] grow-2 overflow-hidden rounded-3xl md:min-h-[10vh]">
            <img
              src={image}
              alt="Password Reset"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Left side - Forgot Password Form */}
        <div className="flex w-full md:w-1/2 bg-white/30 h-[70vh] items-center justify-center p-6 mt-[10vh] rounded-l-2xl">
          <div className="mx-auto w-full max-w-md">
            <h1 className="mb-8 text-center text-4xl font-bold text-gray-800 font-[sora]">
              Forgot Password
            </h1>

            <div className="mb-6 space-y-6">
              {/* Email Input */}
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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

              {/* Send OTP Button */}
              <button
                onClick={handleSendOtp}
                className="w-full rounded-full bg-[#004D80] py-3 text-xl font-semibold text-white shadow-lg hover:bg-black focus:outline-none"
              >
                Send OTP
              </button>

              {/* OTP Input with Key Icon */}
              <div className="relative">
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="peer w-full border-b-2 border-[#000000] bg-transparent py-2 pl-2 pr-10 text-black focus:outline-none placeholder-transparent"
                  placeholder="Enter OTP"
                />
                <label
                  htmlFor="otp"
                  className="absolute left-2 -top-3 text-sm text-[#000000] transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-black"
                >
                  OTP
                </label>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <KeyRound className="h-5 w-5 text-black" />
                </div>
              </div>

              {/* New Password Input */}
              <div className="relative w-full">
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="peer w-full border-b-2 border-black bg-transparent py-2 pl-2 pr-10 text-black focus:outline-none placeholder-transparent"
                  placeholder="Enter new password"
                />
                <label
                  htmlFor="newPassword"
                  className="absolute left-2 -top-3 text-sm text-black transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-black"
                >
                  New Password
                </label>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <Lock className="h-5 w-5 text-black" />
                </div>
              </div>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              className="mt-8 w-full rounded-full bg-[#004D80] py-3 text-center text-xl font-semibold text-white shadow-lg hover:bg-black focus:outline-none"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
