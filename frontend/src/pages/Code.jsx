import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import speakingGif from "../assets/speaking.gif";
import audioFile from "../assets/audio.mp3";
import { FaVolumeMute, FaVolumeUp, FaPlay } from "react-icons/fa";
import { runCode } from "../services/api";

const LearnPage = () => {
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const [requiresInteraction, setRequiresInteraction] = useState(true);
  const audioRef = useRef(null);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [hints, setHints] = useState("Hints will appear here.");
  const [isPrint, setIsPrint] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check localStorage for previous interaction
    const hasInteracted = localStorage.getItem("audioInteraction");
    if (hasInteracted === "true") {
      setRequiresInteraction(false);
      // Auto-play after 2 seconds if previously allowed
      const timer = setTimeout(() => {
        if (audioRef.current) {
          audioRef.current
            .play()
            .then(() => {
              setAudioPlaying(true);
              setAudioReady(true);
            })
            .catch((error) => {
              console.error("Auto-play failed:", error);
              setRequiresInteraction(true);
            });
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleFirstPlay = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setAudioPlaying(true);
          setAudioReady(true);
          setRequiresInteraction(false);
          localStorage.setItem("audioInteraction", "true");
        })
        .catch((error) => {
          console.error("Play failed:", error);
        });
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        // Unmute and play
        audioRef.current
          .play()
          .then(() => {
            setAudioPlaying(true);
            setIsMuted(false);
          })
          .catch((error) => console.error("Audio play failed:", error));
      } else {
        // Mute and pause
        audioRef.current.pause();
        setAudioPlaying(false);
        setIsMuted(true);
      }
    }
  };

  const handleAudioEnd = () => {
    setAudioPlaying(false);
    setIsMuted(true);
  };

  const handleRunCode = async () => {
    try {
      const response = await runCode(code);
      if (response.suggestion) {
        setOutput(response.suggestion);
        setHints(response.suggestion);
        setIsPrint(response.is_print);
      } else {
        setOutput("No suggestions available.");
        setHints("No hints available.");
        setIsPrint(false);
      }
    } catch (error) {
      console.error("Error executing code:", error);
      setOutput("Error executing the code");
      setHints("Error during execution");
      setIsPrint(false);
    }
  };

  const handleNextClick = () => {
    navigate("/exercise");
  };

  useEffect(() => {
    const watched = localStorage.getItem("videoWatched") === "true";
    if (!watched) {
      navigate("/learn"); // Redirect to Learn page if not completed
    }
  }, [navigate]);

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        {/* Left Half */}
        <div className="w-1/2 flex flex-col p-6 bg-transparent">
          {/* Intro Section (Top Half) */}
          <div className="flex-1 p-6 bg-[#CCE5E5] outline outline-[#008080] rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Intro</h2>
            <p className="text-lg mt-2">
              In this lesson, we will explore the basics of Python, one of the
              most popular programming languages. You'll learn about variables,
              data types, and simple operations. By the end of this lesson,
              you'll be able to write your first Python program and understand
              how it runs.
            </p>
            <div className="flex items-center mt-4">
              <img
                src={speakingGif}
                alt="Speaking animation"
                className="w-24 h-24"
              />
              {!audioReady ? (
                <button
                  onClick={handleFirstPlay}
                  className="text-2xl p-3 bg-white rounded-full shadow-md ml-4"
                  aria-label="Play audio"
                >
                  <FaPlay />
                </button>
              ) : (
                <button
                  onClick={toggleMute}
                  className="text-2xl p-3 bg-white rounded-full shadow-md ml-4"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                </button>
              )}
            </div>
          </div>

          {/* Hints Section (Bottom Half) */}
          <div className="flex-1 p-6 mt-4 bg-[#CCE5E5] outline outline-[#008080] rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Hints</h2>
            <p className="text-lg mt-2">{hints}</p>
          </div>
        </div>

        {/* Right Half: Code Editor & Run/Next Button */}
        <div className="w-1/2 flex flex-col p-6 bg-transparent">
          <textarea
            className="flex-1 w-full p-2 border rounded-md bg-[#CAE9F5] outline outline-[#73B9EE] text-2xl"
            placeholder="Write your Python code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <div className="flex justify-between mt-4">
            <button
              onClick={() => navigate("/learn")}
              className="p-4 rounded-lg text-lg bg-[#28BEBE] text-black outline outline-[#003366] hover:bg-[#CCE5E5]"
            >
              Previous
            </button>
            <button
              className={`px-6 py-3 rounded-lg text-lg ${
                isPrint
                  ? "bg-[#73B9EE] text-black outline outline-[#003366] hover:bg-[#CAE9F5]"
                  : "bg-[#28BEBE] text-black outline outline-[#003366] hover:bg-[#CCE5E5]"
              }`}
              onClick={isPrint ? handleNextClick : handleRunCode}
            >
              {isPrint ? "Next" : "Run"}
            </button>
          </div>
        </div>
      </div>
      <Footer />
      <audio
        ref={audioRef}
        src={audioFile}
        onEnded={handleAudioEnd}
        preload="auto"
      />
    </div>
  );
};

export default LearnPage;
