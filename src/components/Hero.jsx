import { useEffect, useRef, useState } from "react";
import main1 from "../assets/images/main1.jpeg";
import music from "../assets/music/music.mp3";

function Hero() {
  const audioRef = useRef(null);
const [isPlaying, setIsPlaying] = useState(false);

useEffect(() => {
  if (audioRef.current) {
    audioRef.current.volume = 0.50;
  }
}, []);
  async function toggleMusic() {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.log("Music could not play:", error);
    }
  }

  return (
    <section className="hero">
      <audio ref={audioRef} src={music} loop preload="auto" />

      <img src={main1} alt="Aiturgan Gyz Uzatuu" className="heroImg" />

      <div className="heroOverlay" />

      <div className="heroContent">
        <button
          className={`musicButton ${isPlaying ? "active" : ""}`}
          onClick={toggleMusic}
          aria-label="Play music"
        >
          <span className="playIcon">{isPlaying ? "Ⅱ" : "▶"}</span>
        </button>

    
        <h1>Aiturgan</h1>
        <h2>Qyz Uzatuu</h2>

        <p className="heroDate">16.06.2026</p>

        <a href="#invitation" className="scrollDown" aria-label="Scroll down">
          <b>↓</b>
        </a>
      </div>
    </section>
  );
}

export default Hero;