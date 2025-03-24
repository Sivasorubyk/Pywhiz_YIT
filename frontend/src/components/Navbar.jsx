import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { useAuth } from "../context/AuthContext"; // Import the AuthContext

const Navbar = () => {
  const { user, logout } = useAuth(); // Access the user from AuthContext
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // State for dropdown visibility
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setShowDropdown(false); // Close dropdown on logout
  };
  return (
    <nav className="bg-[#003366] sticky top-0 left-0 right-0 z-50 shadow-lg">
      {/* Navbar Container */}
      <div className="px-10 flex justify-between items-center p-4">
        {/* Logo Section */}
        <div>
          <h1 className="text-white text-xl sm:text-2xl font-bold">PyWhiz</h1>
        </div>

        {/* Menu Section */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Toggle */}
          <button
            className="text-white md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6 lg:space-x-8 text-base sm:text-lg">
            <li>
              <Link to="/" className="text-white hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/learn" className="text-white hover:underline">
                Learn
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-white hover:underline">
                Contact
              </Link>
            </li>

            {/* User Profile Icon or Login */}
            <li className="relative">
              {user ? (
                <button
                  onClick={() => setShowDropdown(!showDropdown)} // Toggle dropdown visibility
                  className="flex items-center text-white"
                >
                  <User size={24} className="mr-2" /> {/* User icon */}
                  <span className="text-white">{user.username}</span>{" "}
                  {/* Display username */}
                </button>
              ) : (
                <Link to="/login" className="text-white hover:underline">
                  Login
                </Link>
              )}

              {/* Dropdown Menu for User Profile */}
              {showDropdown && (
                <div
                  ref={dropdownRef} // Attach ref for detecting outside clicks
                  className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-md w-48 z-50"
                >
                  <ul className="text-black">
                    <li>
                      <Link
                        to="/edit-profile"
                        className="block px-4 py-2 text-sm text-black bg-[#28BEBE] hover:bg-[#CCE5E5] w-full text-left rounded-t-md transition-all"
                      >
                        Edit Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-600 w-full text-left rounded-b-md transition-all"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ${
          isOpen ? "max-h-screen" : "max-h-0 overflow-hidden"
        }`}
      >
        <ul className="flex flex-col items-center bg-[#003366] py-4 gap-4 text-lg">
          <li>
            <Link
              to="/"
              className="text-white text-base sm:text-lg hover:underline"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/learn"
              className="text-white text-base sm:text-lg hover:underline"
              onClick={() => setIsOpen(false)}
            >
              Learn
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-white text-base sm:text-lg hover:underline"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="text-white text-base sm:text-lg hover:underline"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
