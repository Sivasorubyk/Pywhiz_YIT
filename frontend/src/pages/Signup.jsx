import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import logo from '../assets/logo.jpg'
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white w-full max-w-6xl h-screen flex flex-col md:flex-row">
        {/* Left Side - Image */}
        <div className="md:w-1/2 h-screen">
          <img 
            src="src/assets/login-image.png" 
            alt="Signup Illustration" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side - Signup Form */}
        <div className="md:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="flex flex-col items-center mb-6">
              <img 
                src={logo} 
                alt="Logo" 
                className="w-20 h-20 object-contain mb-2"
              />
              <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
            </div>
            <form className="mt-4 space-y-4">
              {/* Name Field */}
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              />
              
              {/* Email Field */}
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              />

              {/* Password Field */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                </button>
              </div>

              {/* Confirm Password Field */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                </button>
              </div>

              {/* Buttons */}
              <button 
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600"
              >
                Sign Up
              </button>
              <p className="text-center font-semibold">Already have an account?</p>
              <button
                type="button"
                onClick={handleLogin}
                className="w-full bg-yellow-500 text-black py-2 rounded-lg font-semibold hover:bg-yellow-600"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
