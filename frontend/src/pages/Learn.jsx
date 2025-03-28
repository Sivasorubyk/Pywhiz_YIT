import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import demoVideo from "../assets/videos/demo.mp4";
import speakingGif from "../assets/speaking.gif";
import audioFile from "../assets/audio.mp3";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

const LearnPage = () => {
  const [videoWatched, setVideoWatched] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const watched = localStorage.getItem("videoWatched") === "true";
    setVideoWatched(watched);
  }, []);

  const handleVideoPlay = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setAudioPlaying(false);
    }
    setIsMuted(true);
  };

  const handleVideoEnd = () => {
    setVideoWatched(true);
    localStorage.setItem("videoWatched", "true");
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setAudioPlaying(true);
    }
    setIsMuted(false);
  };

  const toggleMute = () => {
    if (isMuted) {
      videoRef.current.pause();
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
        setAudioPlaying(true);
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        setAudioPlaying(false);
      }
    }
    setIsMuted(!isMuted);
  };

  const handleNext = () => {
    if (videoWatched) {
      navigate("/code");
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        {/* Video Section (Left Half) */}
        <div className="w-1/2 flex justify-center items-center bg-transparent pt-6 pl-6">
          <video
            ref={videoRef}
            className="w-full h-full outline outline-[#008080] rounded-lg"
            controls
            onPlay={handleVideoPlay}
            onEnded={handleVideoEnd}
          >
            <source src={demoVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Right Half */}
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
          </div>

          {/* GIF, Transcript & Controls (Bottom Half) */}
          <div className="flex-1 flex items-center justify-between mt-4 p-6 bg-[#CCE5E5] outline outline-[#008080] rounded-lg shadow-md">
            <img
              src={speakingGif}
              alt="Speaking animation"
              className="w-24 h-24"
            />
            <p className="text-lg pl-6">
              An exercise will follow after you press the next button to test
              your knowledge.
            </p>
            <button
              onClick={toggleMute}
              className="text-2xl p-3 bg-white rounded-full shadow-md"
            >
              {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
            {videoWatched && (
              <button
                className="ml-4 px-6 py-3 bg-[#28BEBE] text-black outline outline-[#003366] rounded-lg text-lg hover:bg-[#CCE5E5]"
                onClick={handleNext}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
      {/* Hidden Audio Player */}
      <audio ref={audioRef} src={audioFile} />
    </div>
  );
};

export default LearnPage;
