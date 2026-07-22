import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import LoginScreen from "./components/LoginScreen";
import IntroScreen from "./components/IntroScreen";
import Timeline from "./components/Timeline";
import InteractiveMoment from "./components/InteractiveMoment";
import FinaleScreen from "./components/FinaleScreen";
import HomeScreen from "./components/HomeScreen";
import Gallery from "./components/Gallery";
import Photobooth from "./components/Photobooth";

function App() {
  const [screen, setScreen] = useState("login");
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("dev") === "true") {
      setUnlocked(true);
      const hasOpened = localStorage.getItem("hasOpenedBefore");
      setScreen(hasOpened ? "home" : "intro");
    }
  }, []);

  const handleUnlock = () => {
    setUnlocked(true);
    const hasOpened = localStorage.getItem("hasOpenedBefore");
    setScreen(hasOpened ? "home" : "intro");
  };

  const handleIntroComplete = () => {
    localStorage.setItem("hasOpenedBefore", "true");
    setScreen("timeline");
  };

  const handleTimelineComplete = () => {
    setScreen("interactive");
  };

  const handleInteractiveComplete = () => {
    setScreen("finale");
  };

  const handleFinaleComplete = () => {
    setScreen("home");
  };

  const handleNavigate = (target) => {
    setScreen(target);
  };

  const handleBack = () => {
    setScreen("home");
  };

  return (
    <div className="min-h-screen bg-cream">
      <AnimatePresence mode="wait">
        {screen === "login" && (
          <LoginScreen key="login" onUnlock={handleUnlock} />
        )}
        {screen === "intro" && unlocked && (
          <IntroScreen key="intro" onComplete={handleIntroComplete} />
        )}
        {screen === "timeline" && (
          <Timeline key="timeline" onComplete={handleTimelineComplete} />
        )}
        {screen === "interactive" && (
          <InteractiveMoment
            key="interactive"
            onComplete={handleInteractiveComplete}
          />
        )}
        {screen === "finale" && (
          <FinaleScreen key="finale" onComplete={handleFinaleComplete} />
        )}
        {screen === "home" && (
          <HomeScreen key="home" onNavigate={handleNavigate} />
        )}
        {screen === "gallery" && (
          <Gallery key="gallery" onBack={handleBack} />
        )}
        {screen === "photobooth" && (
          <Photobooth key="photobooth" onBack={handleBack} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
