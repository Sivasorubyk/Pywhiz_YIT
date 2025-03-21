import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import logo from '../assets/logo.jpg'
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white w-full max-w-6xl h-screen flex flex-col md:flex-row">
        {/* Left Side - Image */}
        <div className="md:w-1/2 h-screen">
          <img 
            src="src/assets/login-image.png" 
            alt="Login Illustration" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="md:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="flex flex-col items-center mb-6">
              <img 
                src={logo} 
                alt="Logo" 
                className="w-20 h-20 object-contain mb-2"
              />
              <h2 className="text-2xl font-bold text-gray-800">Student Registration</h2>
            </div>
            <form className="mt-4 space-y-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              />
              {/* Password Field */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
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

              {/* Forgot Password */}
              <p className="text-center text-gray-700">I do not remember my password</p>

              {/* Buttons */}
              <button className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600">
                Login
              </button>
              <p className="text-center font-semibold">Create New Account</p>
              <button
                type="button"
                onClick={handleSignup}
                className="w-full bg-yellow-500 text-black py-2 rounded-lg font-semibold hover:bg-yellow-600"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
