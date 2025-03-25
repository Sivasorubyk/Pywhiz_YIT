import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import speakingGif from "../assets/speaking.gif"; // Replace with actual GIF
import audioFile from "../assets/audio.mp3"; // Ensure this path is correct
import axios from "axios";

const Code = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [isCodeExecuted, setIsCodeExecuted] = useState(false);

  const handleRunCode = async () => {
    try {
      const response = await axios.post("https://api.openai.com/v1/completions", {
        model: "gemini", // Change to gemini
        prompt: `Execute this Python code and return output:\n${code}`,
        max_tokens: 100,
      }, {
        headers: {
          Authorization: `AIzaSyA-KyzFiuOeQImTTkY9wRKZ8opEr9QFfZw`, // Ensure your API key is valid
          "Content-Type": "application/json",
        },
      });

      setOutput(response.data.choices[0].text.trim());
      setIsCodeExecuted(true);
    } catch (error) {
      console.error("Error executing code:", error);
      setOutput("Error executing the code");
    }
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
