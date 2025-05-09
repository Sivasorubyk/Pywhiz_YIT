import { useState } from "react";
import { Mail, Lock, KeyRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { forgotPassword, verifyOTP } from "../services/api"; // Import the API functions
import image from "../assets/signup.png";
import "@fontsource/inknut-antiqua";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSendOtp = async () => {
    try {
      await forgotPassword(email);
      setMessage("OTP has been sent to your email");
    } catch (err) {
      setError(err.message || "Failed to send OTP");
    }
  };

  const handleResetPassword = async () => {
    try {
      await verifyOTP({ email, otp, new_password: newPassword });
      setMessage("Password reset successful");
      navigate("/login");
    } catch (err) {
      setError(err.message || "Failed to verify OTP");
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-[#D0F0FF] to-[#A3DAFF] p-4">
      <div className="flex w-full max-w-6xl flex-col md:flex-row-reverse overflow-hidden rounded-3xl backdrop-blur-sm">
        {/* Right side - Image */}
        <div className="relative w-full hidden md:block md:w-1/2">
          <img
            src={image}
            alt="Python Programming"
            className="w-full h-full object-cover rounded-r-3xl"
          />
        </div>

        {/* Left side - Forgot Password Form */}
        <div className="flex w-full md:w-1/2 bg-white/30 items-center justify-center p-6 md:rounded-l-2xl flex-col md:flex-row">
          <div className="w-full max-w-md text-center">
            <h1 className="mb-6 text-3xl md:text-4xl font-bold text-gray-800 font-inknut">
              Forgot Password
            </h1>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            {message && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                {message}
              </div>
            )}

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
                className="mt-6 w-full rounded-full bg-[#004D40] py-3 text-center text-lg font-semibold text-white shadow-lg hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-inknut"
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

            {/* Reset Password Button */}
            <button
              onClick={handleResetPassword}
              className="mt-6 w-full rounded-full bg-[#004D40] py-3 text-center text-lg font-semibold text-white shadow-lg hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-inknut"
            >
              Reset Password
            </button>

            {/* Links */}
            <div className="mt-4 flex flex-col md:flex-row md:justify-between text-sm text-center md:text-left">
              <a
                href="#"
                className="text-[#004D40] hover:text-black mb-2 md:mb-0"
                onClick={handleLogin}
              >
                Remember the password?
              </a>
              <a
                href="#"
                className="text-[#004D40] hover:text-black"
                onClick={handleSignup}
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
