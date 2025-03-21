import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">Python Learning</h1>
        <ul className="flex space-x-4">
          <li><Link to="/" className="text-white">Home</Link></li>
          <li><Link to="/learn" className="text-white">Learn</Link></li>
          <li><Link to="/contact" className="text-white">Contact</Link></li>
          <li><Link to="/login" className="text-white">Login</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
