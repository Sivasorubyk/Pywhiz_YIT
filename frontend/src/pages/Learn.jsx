import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Learn = () => {
  return (
    <div>
      <Navbar />
      <div className="p-10">
        <h2 className="text-2xl font-bold">Start Learning Python</h2>
        <p className="mt-2 text-gray-600">Explore interactive lessons and coding exercises.</p>
      </div>
      <Footer />
    </div>
  );
};

export default Learn;
