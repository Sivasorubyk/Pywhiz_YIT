import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import demoVideo from "../assets/videos/demo.mp4";
// import videoThumbnail from "../assets/video-thumbnail.jpg"; // Replace with actual video thumbnail
import speakingGif from "../assets/speaking.gif"; // Replace with actual GIF
import audioFile from "../assets/audio.mp3"; // Replace with actual audio file

const LearnPage = () => {
  const [videoWatched, setVideoWatched] = useState(false);
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [nextEnabled, setNextEnabled] = useState(false);
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const navigate = useNavigate();

  // Check local storage on component mount
  useEffect(() => {
    const watched = localStorage.getItem("videoWatched") === "true";
    setVideoWatched(watched);
    setNextEnabled(watched); // Enable next button if video was watched
  }, []);

  const handleVideoEnd = () => {
    setVideoWatched(true);
    setNextEnabled(true); // Enable the Next button immediately after video ends
    localStorage.setItem("videoWatched", "true"); // Store in local storage
  };

  const handleAudioEnd = () => {
    setAudioPlayed(true);
    // No need to check for enabling the Next button here
  };

  const handleNext = () => {
    navigate("/code"); // Navigate to the Code page
  };

  return (
    <div className="bg-gradient-to-b from-blue-100 to-white min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center">Welcome to our PyWhiz Classroom</h1>
        <p className="text-center mt-2">Let's start our lessons, We are in milestone 1!</p>

        {/* Video Section */}
        <div className="mt-6 flex justify-center">
          <video
            ref={videoRef}
            className="rounded-lg shadow-lg w-full max-w-2xl"
            controls
            onEnded={handleVideoEnd}
          >
            <source src={demoVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Transcript */}
        <div className="mt-4 p-4 bg-blue-100 rounded-lg shadow-md">
          <p>
            வீடியோ லீட் எப்படி வேலை செய்கிறது என்பது பற்றிய விளக்கம் இங்கே...
          </p>
        </div>

        {/* Speaking Animation and Text */}
        <div className="mt-6 flex items-center bg-gray-100 p-4 rounded-lg shadow-md">
          <div className="flex-1">
            <p>
              அது எப்படி வேலை செய்கிறது. வீடியோ லீட்டின் பின்னணி உள்ள...
            </p>
          </div>
          <img src={speakingGif} alt="Speaking animation" className="w-20 h-20" />
        </div>

        {/* Audio Player */}
        <div className="mt-4 flex items-center">
          <audio ref={audioRef} controls onEnded={handleAudioEnd}>
            <source src={audioFile} type="audio/mpeg" />
            Your browser does not support the audio tag.
          </audio>
        </div>

        {/* Next Button */}
        <div className="mt-6 text-right">
          <button
            className={`px-6 py-2 rounded-lg font-bold text-white transition-all ${
              nextEnabled ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={nextEnabled ? handleNext : null}
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

export default LearnPage;
