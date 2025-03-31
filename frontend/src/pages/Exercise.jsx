import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import speakingGif from "../assets/speaking.gif";
import audioFile from "../assets/audio.mp3";
import confetti from "canvas-confetti";
import { FaVolumeMute, FaVolumeUp, FaPlay } from "react-icons/fa";
import { GreenButton, BlueButton } from "../components/Buttons";

const Exercise = () => {
  const navigate = useNavigate();
  const correctAnswers = ["correct", "wrong", "correct"];
  const [userAnswers, setUserAnswers] = useState(["", "", ""]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isMuted, setIsMuted] = useState(true);
  const [audioReady, setAudioReady] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const audioRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setShowPlayButton(false);
      if (audioRef.current) {
        audioRef.current.play();
        setAudioReady(true);
        setIsMuted(false);

        audioRef.current.addEventListener("ended", () => {
          setIsMuted(true);
        });
      }
    }, 2000);

    return () => {
      clearTimeout(timerRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("ended", () => {});
      }
    };
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      setIsMuted(!isMuted);
    }
  };

  const handlePlayButtonClick = () => {
    clearTimeout(timerRef.current);
    setShowPlayButton(false);
    if (audioRef.current) {
      audioRef.current.play();
      setAudioReady(true);
      setIsMuted(false);

      audioRef.current.addEventListener("ended", () => {
        setIsMuted(true);
      });
    }
  };

  const handleAnswerChange = (index, value) => {
    setUserAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[index] = value;
      return newAnswers;
    });
  };

  const checkAnswers = () => {
    const isCorrect =
      JSON.stringify(userAnswers) === JSON.stringify(correctAnswers);
    setIsCompleted(isCorrect);
    if (isCorrect) {
      confetti();
      setFeedbackMessage("All answers are correct! 🎉");
    } else {
      const incorrectAnswers = userAnswers
        .map((answer, index) =>
          answer !== correctAnswers[index] ? `Question ${index + 1}` : null
        )
        .filter(Boolean);
      setFeedbackMessage(
        `Incorrect answers in: ${incorrectAnswers.join(", ")}`
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto text-center py-10">
        <h1 className="text-2xl font-bold text-gray-800">
          It's time to test your understanding, We are in Milestone 1!
        </h1>
        <div className="p-5 mt-5 bg-[#CCE5E5] outline outline-[#008080] rounded-lg shadow-md flex items-center justify-between">
          <p className="text-left text-black text-lg w-3/4">
            This exercise is designed to test your understanding of the concepts
            covered in Milestone 1. You will be presented with an audio clip and
            a series of questions related to it. Please listen carefully and
            select the most accurate answer for each question. Good luck, and
            may this exercise solidify your grasp of the material!
          </p>
          <div className="flex flex-col items-center">
            {showPlayButton ? (
              <button
                onClick={handlePlayButtonClick}
                className="text-3xl p-3 bg-white rounded-full shadow-md"
              >
                <FaPlay />
              </button>
            ) : audioReady ? (
              <button
                onClick={toggleMute}
                className="text-2xl p-3 bg-white rounded-full shadow-md"
              >
                {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
              </button>
            ) : null}
          </div>
          <img
            src={speakingGif}
            alt="Speaking Animation"
            className="w-24 h-24"
          />
        </div>

        <div className="mt-5 bg-[#CCE5E5] outline outline-[#008080] p-8 rounded-lg shadow-md">
          {userAnswers.map((answer, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-2 border-2 border-[#003366] rounded mt-2"
            >
              <p className="text-black">Question {index + 1} goes here...</p>
              <select
                className="border p-1 text-black"
                value={answer}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
              >
                <option value="">Select</option>
                <option value="correct">✅ Correct</option>
                <option value="wrong">❌ Wrong</option>
              </select>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-4">
          <GreenButton
            className="mr-auto"
            text="Previous"
            onClick={() => navigate("/code")}
          />
          <div className="flex-grow">
            {isCompleted && (
              <p className="font-bold mt-10 text-gray-700 text-center">
                Milestone 1 Completed! 🎉 Congratulations!
                {feedbackMessage && <br />}
                {feedbackMessage}
              </p>
            )}
            {!isCompleted && feedbackMessage && (
              <p
                className={`font-bold mt-1 text-center ${
                  isCompleted ? "text-green-600" : "text-red-600"
                }`}
              >
                {feedbackMessage}
              </p>
            )}
          </div>
          {isCompleted ? (
            <BlueButton text="Next" onClick={() => navigate("/nextpage")} />
          ) : (
            <GreenButton text="Check" onClick={checkAnswers} />
          )}
        </div>
      </div>
      <Footer />
      <audio ref={audioRef} src={audioFile} />
    </div>
  );
};

export default Exercise;
