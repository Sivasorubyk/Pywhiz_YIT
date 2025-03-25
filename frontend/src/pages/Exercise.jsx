import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import speakingGif from "../assets/speaking.gif"; // Replace with actual GIF
import audioFile from "../assets/audio.mp3"; // Ensure this path is correct
import confetti from "canvas-confetti";

const Exercise = () => {
  const navigate = useNavigate();
  const correctAnswers = ["correct", "wrong", "correct"];
  const [userAnswers, setUserAnswers] = useState(["", "", ""]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [nextEnabled, setNextEnabled] = useState(false);

  const handleAnswerChange = (index, value) => {
    let newAnswers = [...userAnswers];
    newAnswers[index] = value;
    setUserAnswers(newAnswers);
  };

  const checkAnswers = () => {
    if (JSON.stringify(userAnswers) === JSON.stringify(correctAnswers)) {
      setIsCompleted(true);
      setNextEnabled(true);
      confetti();
    } else {
      alert("Incorrect answers! Try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-100 to-blue-200">
      <Navbar />
      <div className="container mx-auto text-center py-10">
        <h1 className="text-2xl font-bold">It's time to start test your understanding, We are in Milestone 1!</h1>
        <div className="bg-white p-5 mt-5 rounded-lg shadow-lg flex">
          <p className="flex-1 text-left">
            {/* Instruction text here */}
            Exercise instructions go here...
          </p>
          <img src={speakingGif} alt="Speaking Animation" className="w-40 h-40" />
        </div>

        <audio controls className="mt-5">
        <source src={audioFile} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>

        <div className="mt-5 bg-white p-5 rounded-lg shadow-lg">
          {[0, 1, 2].map((index) => (
            <div key={index} className="flex justify-between items-center p-2 border rounded mt-2">
              <p>Question {index + 1} goes here...</p>
              <select
                className="border p-1"
                value={userAnswers[index]}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
              >
                <option value="">Select</option>
                <option value="correct">✅ Correct</option>
                <option value="wrong">❌ Wrong</option>
              </select>
            </div>
          ))}
        </div>

        <button onClick={checkAnswers} className="bg-blue-500 text-white px-5 py-2 rounded mt-5">Check</button>
        
        {isCompleted && (
          <p className="text-green-600 font-bold mt-3">Milestone 1 Completed! 🎉 Congratulations!</p>
        )}

        <div className="flex justify-between mt-5">
          <button onClick={() => navigate("/learncode")} className="bg-teal-500 text-white px-5 py-2 rounded">Previous</button>
          <button
            onClick={() => navigate("/nextpage")}
            className={`px-5 py-2 rounded ${nextEnabled ? "bg-green-500 text-white" : "bg-gray-400 text-gray-600"}`}
            disabled={!nextEnabled}
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Exercise;
