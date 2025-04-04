import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { Mail, Lock } from "lucide-react";
import image from "../assets/login.png";
import "@fontsource/inknut-antiqua";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login: authLogin } = useAuth(); // Use the login function from context

  const handleSignup = () => {
    navigate("/signup");
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
      const response = await login(formData);
      authLogin(response.user, response.jwt); // Update context after login
      navigate("/"); // Redirect to the homepage or dashboard
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-[#002244] to-[#D0F0FF] p-4">
      <div className="flex w-full max-w-6xl flex-col md:flex-row overflow-hidden rounded-3xl backdrop-blur-sm shadow-xl">
        <div className="relative w-full hidden md:block md:w-1/2">
          <img
            src={image}
            alt="Python Programming"
            className="w-full h-full object-cover rounded-l-3xl"
          />
        </div>
        <div className="flex w-full md:w-1/2 bg-white/30 h-auto items-center justify-center p-6 md:rounded-r-2xl">
          <div className="w-full max-w-md">
            <h1 className="mb-6 text-center text-3xl md:text-4xl font-bold text-gray-800 font-inknut">
              Login
            </h1>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="mb-6 space-y-6">
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="peer w-full border-b-2 border-black bg-transparent py-2 pl-2 pr-10 text-black focus:outline-none placeholder-[#002244]"
                  placeholder="Enter your email"
                  required
                />
                {/* <label
                  htmlFor="email"
                  className="absolute left-2 -top-3 text-sm text-black transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#002244] peer-focus:text-[#002244]"
                >
                  Email
                </label> */}
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <Mail className="h-5 w-5 text-black" />
                </div>
              </div>

              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="peer w-full border-b-2 border-black bg-transparent py-2 pl-2 pr-10 text-black focus:outline-none placeholder-[#002244]"
                  placeholder="Enter your password"
                  required
                />
                {/* <label
                  htmlFor="password"
                  className="absolute left-2 -top-3 text-sm text-black transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#002244] peer-focus:text-[#002244]"
                >
                  Password
                </label> */}
                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  <Lock className="h-5 w-5 text-black" />
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 w-full rounded-full bg-[#002244] py-3 text-center text-lg font-semibold text-white shadow-lg hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-inknut"
              >
                Login
              </button>

              <div className="mt-4 flex flex-col md:flex-row md:justify-between text-sm text-center md:text-left">
                <a
                  href="#"
                  className="text-[#002244] hover:text-black mb-2 md:mb-0"
                  onClick={handleSignup}
                >
                  Create an account
                </a>
                <a
                  href="#"
                  className="text-[#002244] hover:text-black"
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

export default Login;
