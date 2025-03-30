import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import introVideo from "../assets/videos/intro.mp4";
import demoVideo from "../assets/videos/demo.mp4";
import introThumb from "../assets/introThumb.png";
import demoThumb from "../assets/demoThumb.png";
import { Link } from "react-router-dom";
import { GreenButton } from "../components/Buttons"; // Import GreenButton

const Home = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [faqOpen, setFaqOpen] = useState(null);

  const images = [
    "src/assets/image1.jpeg",
    "src/assets/image1.jpeg",
    "src/assets/image1.jpeg",
    "src/assets/image1.jpeg",
    "src/assets/image1.jpeg",
    "src/assets/image1.jpeg",
  ];

  const faqs = [
    {
      question: "What is PyWhiz?",
      answer: "PyWhiz is an AI-powered platform for learning Python.",
    },
    {
      question: "Why choose us?",
      answer:
        "We offer interactive exercises, video tutorials, and AI assistance.",
    },
    {
      question: "Can anyone follow our application?",
      answer: "Yes! PyWhiz is designed for beginners aged 11-15.",
    },
    {
      question: "Why is it great for beginners?",
      answer: "Simple explanations, hands-on coding, and fun exercises.",
    },
    {
      question: "Can I improve my Python skills here?",
      answer: "Absolutely! Our guided lessons and AI support help you grow.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8 px-16">
        {/* Welcome and Video Section in parallel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Welcome Box */}
          <div className="text-center bg-[#CCE5E5] outline outline-[#008080] p-8 rounded-lg shadow-md h-[83vh] flex flex-col justify-center">
            <h1 className="text-3xl font-bold mb-6">Welcome to PyWhiz</h1>
            <p className="mt-4 text-lg">
              If you are between age 11 - 15, this is the right platform for
              learning Python.
            </p>
            <Link to="/learn">
              <GreenButton text="Get Started" className="mt-8" />
            </Link>
          </div>

          {/* First Video Player */}
          <div
            className="relative cursor-pointer h-[83vh] outline outline-[#008080] rounded-lg shadow-md"
            onClick={() => setSelectedVideo(introVideo)}
          >
            <video
              src={introVideo}
              className="w-full h-full object-cover rounded-lg shadow-lg"
              poster={introThumb}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl text-white bg-black bg-opacity-50 px-6 py-4 rounded-full hover:bg-opacity-70">
                ▶
              </span>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4 ">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index + 1}`}
              className="w-full md:h-[46vh] object-cover outline outline-[#008080] rounded-lg shadow-md"
            />
          ))}
        </div>

        {/* Second Video Section (Demo) */}
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Watch Demo</h2>
          <video
            controls
            className="w-[85%] mx-auto outline outline-[#008080] rounded-lg shadow-md"
            poster={demoThumb}
          >
            <source src={demoVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* FAQ Section */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-center">
            Frequently Asked Questions
          </h2>
          <div className="mt-4 space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-[#CCE5E5] outline outline-[#008080] p-4 rounded-lg cursor-pointer"
                onClick={() => setFaqOpen(faqOpen === index ? null : index)}
              >
                <h3 className="font-semibold">{faq.question}</h3>
                {faqOpen === index && <p className="mt-2">{faq.answer}</p>}
              </div>
            ))}
          </div>
        </div>
      </main>
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center"
          onClick={() => setSelectedVideo(null)}
        >
          <video controls className="w-3/4 max-w-3xl">
            <source src={selectedVideo} type="video/mp4" />
          </video>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Home;
