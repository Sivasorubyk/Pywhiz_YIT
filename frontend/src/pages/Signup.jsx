import { useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import image from "../assets/signup.png";
import { register } from "../services/api";
import "@fontsource/inknut-antiqua";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData); // Send signup data to API
      navigate("/login"); // Redirect to login page on successful signup
    } catch (err) {
      setError(err.message || "Registration failed"); // Display error message if registration fails
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-[#D0F0FF] to-[#004D40] p-4">
      <div className="flex w-full max-w-6xl flex-col overflow-hidden rounded-3xl backdrop-blur-sm md:flex-row-reverse">
        {/* Right side - Image */}
        <div className="relative w-full hidden md:block md:w-1/2">
          <img
            src={image}
            alt="Signup Illustration"
            className="w-full h-full object-cover rounded-r-3xl"
          />
        </div>

        {/* Left side - Signup Form */}
        <div className="flex w-full md:w-1/2 bg-white/30 items-center justify-center p-6 md:rounded-l-2xl">
          <div className="w-full max-w-md">
            <h1 className="mb-6 text-center text-3xl md:text-4xl font-bold text-gray-800 font-inknut">
              Sign Up
            </h1>

            {/* Error Message */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="mb-6 space-y-6">
              {/* Name Input */}
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="peer w-full border-b-2 border-[#000000] bg-transparent py-2 pl-2 pr-10 text-black focus:outline-none placeholder-transparent"
                  placeholder="Enter your Name"
                  required
                />
                <label
                  htmlFor="name"
                  className="absolute left-2 -top-3 text-sm text-[#000000] transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-black"
                >
                  Name
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
                  value={formData.email}
                  onChange={handleChange}
                  className="peer w-full border-b-2 border-[#000000] bg-transparent py-2 pl-2 pr-10 text-black focus:outline-none placeholder-transparent"
                  placeholder="Enter your email"
                  required
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
                  value={formData.password}
                  onChange={handleChange}
                  className="peer w-full border-b-2 border-black bg-transparent py-2 pl-2 pr-10 text-black focus:outline-none placeholder-transparent"
                  placeholder="Enter your password"
                  required
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
                  <Lock className="h-5 w-5 text-black" />
                </div>
              </div>

              {/* Signup Button */}
              <button
                type="submit"
                className="mt-6 w-full rounded-full bg-[#004D40] py-3 text-center text-lg font-semibold text-white shadow-lg hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-inknut"
              >
                Sign Up
              </button>

              {/* Links */}
              <div className="mt-4 flex flex-col md:flex-row md:justify-between text-sm text-center md:text-left">
                <a
                  href="#"
                  className="text-[#004D40] hover:text-black mb-2 md:mb-0"
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
