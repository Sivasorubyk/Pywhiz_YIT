import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import demoVideo from "../assets/videos/demo.mp4";
import speakingGif from "../assets/speaking.gif";
import audioFile from "../assets/audio.mp3";
import { VolumeX, Volume2 } from "lucide-react"; // Importing mute/unmute icons

const LearnPage = () => {
  const [videoWatched, setVideoWatched] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Button starts in Unmute (🔊) state
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const watched = localStorage.getItem("videoWatched") === "true";
    setVideoWatched(watched);
  }, []);

  // When video starts, stop the audio and set Unmute (🔊) state
  const handleVideoPlay = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset audio
    }
    setIsMuted(true); // Button should be in Unmute state
  };

  // When video ends, play audio and set Mute (🔇) state
  const handleVideoEnd = () => {
    setVideoWatched(true);
    localStorage.setItem("videoWatched", "true");

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    setIsMuted(false); // Button should be in Mute state
  };

  // Toggle between Muted (🔇) & Unmute (🔊) modes
  const toggleMute = () => {
    if (isMuted) {
      if (videoRef.current) {
        videoRef.current.pause(); // Stop video when audio plays
      }
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
    setIsMuted(!isMuted);
  };

  const handleNext = () => {
    navigate("/code");
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto p-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-800">
          PyWhiz Classroom
        </h1>
        <p className="text-lg text-center text-gray-600 mt-2">
          Let's start our lessons! Milestone 1
        </p>

        {/* Video Section */}
        <div className="mt-6 flex justify-center">
          <div className="relative w-full max-w-2xl rounded-xl overflow-hidden shadow-lg">
            <video
              ref={videoRef}
              className="w-full rounded-lg"
              controls
              onPlay={handleVideoPlay}
              onEnded={handleVideoEnd}
            >
              <source src={demoVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* Transcript */}
        <div className="mt-6 p-6 bg-white rounded-lg shadow-md border border-gray-200">
          <p className="text-gray-700 text-lg font-medium">
            வீடியோ லீட் எப்படி வேலை செய்கிறது என்பது பற்றிய விளக்கம் இங்கே...
          </p>
        </div>

        {/* Speaking Animation with Always Visible Mute Button */}
        <div className="mt-6 flex items-center bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200 relative">
          <div className="flex-1">
            <p className="text-gray-700 text-lg font-medium">
              அது எப்படி வேலை செய்கிறது. வீடியோ லீட்டின் பின்னணி உள்ள...
            </p>
          </div>
          <div className="relative">
            <img
              src={speakingGif}
              alt="Speaking animation"
              className="w-24 h-24 ml-4"
            />
            {/* Mute/Unmute Button (Always Visible) */}
            <button
              onClick={toggleMute}
              className="absolute bottom-2 right-2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-900"
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          </div>
        </div>

        {/* Hidden Audio Player */}
        <audio ref={audioRef} src={audioFile} hidden />

        {/* Next Button */}
        <div className="mt-8 text-center">
          <button
            className={`px-6 py-3 text-lg font-semibold rounded-lg transition-all shadow-md focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
            ${
              videoWatched
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
            onClick={videoWatched ? handleNext : null}
            disabled={!videoWatched}
          >
            Next →
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LearnPage;
