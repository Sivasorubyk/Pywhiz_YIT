import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#003366] shadow-lg w-full">
      <div className="px-10 flex justify-between items-center p-4">
        {/* Logo Section */}
        <div>
          <h1 className="text-white text-xl sm:text-2xl font-bold">PyWhiz</h1>
        </div>
        
        {/* Menu Section */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Toggle */}
          <button className="text-white md:hidden focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
          
          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6 lg:space-x-8 text-base sm:text-lg">
            <li><Link to="/" className="text-white hover:underline">Home</Link></li>
            <li><Link to="/learn" className="text-white hover:underline">Learn</Link></li>
            <li><Link to="/contact" className="text-white hover:underline">Contact</Link></li>
            <li><Link to="/login" className="text-white hover:underline">Login</Link></li>
          </ul>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ${isOpen ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}>
        <ul className="flex flex-col items-center bg-[#003366] py-4 gap-4 text-lg">
          <li><Link to="/" className="text-white text-base sm:text-lg hover:underline" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link to="/learn" className="text-white text-base sm:text-lg hover:underline" onClick={() => setIsOpen(false)}>Learn</Link></li>
          <li><Link to="/contact" className="text-white text-base sm:text-lg hover:underline" onClick={() => setIsOpen(false)}>Contact</Link></li>
          <li><Link to="/login" className="text-white text-base sm:text-lg hover:underline" onClick={() => setIsOpen(false)}>Login</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
