import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import speakingGif from "../assets/speaking.gif"; // Replace with actual GIF
import audioFile from "../assets/audio.mp3"; // Ensure this path is correct
import { runCode } from "../services/api"; // Import the runCode function
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Code = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [isCodeExecuted, setIsCodeExecuted] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  // Check local storage on component mount
  useEffect(() => {
    const executed = localStorage.getItem("codeExecuted") === "true";
    setIsCodeExecuted(executed); // Enable Next button if code was executed
  }, []);

  const handleRunCode = async () => {
    try {
      const response = await runCode(code); // Call the runCode function from api.js
      setOutput(response); // Set the output from the response
      setIsCodeExecuted(true); // Set the code execution state to true
      localStorage.setItem("codeExecuted", "true"); // Store in local storage
    } catch (error) {
      console.error("Error executing code:", error);
      setOutput("Error executing the code");
    }
  };

  const handleNext = () => {
    navigate("/exercise"); // Navigate to the Exercise page
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-blue-100 to-white">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-center mb-4">It's time to start coding, We are in milestone 1!</h1>
        
        <div className="flex items-center gap-4 p-4 bg-blue-100 rounded-lg shadow-md">
          <p className="text-lg">
            Follow the instructions and write your first Python program in the editor below.
          </p>
          <img src={speakingGif} alt="Speaking Animation" className="w-24 h-24" />
        </div>
        
        <div className="mt-4 flex items-center">
          <audio controls className="w-full my-4">
            <source src={audioFile} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
        
        <div className="grid grid-cols-2 gap-4 p-4 bg-blue-50 rounded-lg">
          <textarea
            className="w-full h-40 p-2 border rounded-md"
            placeholder="Write your Python code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <div className="w-full h-40 p-2 border rounded-md bg-gray-100">
            <pre>{output || "Output will be shown here..."}</pre>
          </div>
        </div>
        
        <div className="flex justify-between mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={() => window.history.back()}
          >
            Previous
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
            onClick={handleRunCode}
          >
            Run
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${isCodeExecuted ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            disabled={!isCodeExecuted}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Code;
