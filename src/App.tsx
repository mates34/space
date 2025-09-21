import { useState, useEffect } from "react";
import Hero from "./sections/Hero/Hero";
import About from "./sections/About/About";
import Features from "./sections/Features/Features";
import Chains from "./sections/Chains/Chains";
import Game from "./sections/Game/Game";
import Navbar from "./components/Layout/Navbar";
import Loading from "./components/Loading/Loading";
import "./styles/base/globals.scss";
import "./App.scss";

function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [fadeIn, setFadeIn] = useState(false);
  const [loadingFadeOut, setLoadingFadeOut] = useState(false);

  useEffect(() => {
    // Simulate actual loading tasks
    const loadingTasks = [
      { name: "Loading fonts", duration: 300 },
      { name: "Loading images", duration: 500 },
      { name: "Loading components", duration: 400 },
      { name: "Initializing", duration: 300 },
    ];

    let currentProgress = 0;
    let taskIndex = 0;

    const processTask = () => {
      if (taskIndex >= loadingTasks.length) {
        setProgress(100);
        setTimeout(() => {
          setLoadingFadeOut(true); // Start loading fade out
          setTimeout(() => {
            setLoading(false);
            setTimeout(() => setFadeIn(true), 200); // Start main app fade in
          }, 600); // Wait for fade out to complete
        }, 500);
        return;
      }

      const targetProgress = ((taskIndex + 1) / loadingTasks.length) * 100;

      const interval = setInterval(() => {
        currentProgress += (targetProgress - currentProgress) * 0.1;
        setProgress(Math.min(currentProgress, targetProgress));

        if (currentProgress >= targetProgress - 1) {
          clearInterval(interval);
          taskIndex++;
          setTimeout(processTask, 200); // Small delay between tasks
        }
      }, 50);
    };

    processTask();
  }, []);

  if (loading) {
    return (
      <div
        className={`loading-wrapper ${
          loadingFadeOut ? "loading-wrapper--fade-out" : ""
        }`}
      >
        <Loading progress={progress} />
      </div>
    );
  }

  return (
    <div className={`app ${fadeIn ? "app--fade-in" : ""}`}>
      <Navbar />
      <main className="main-content">
        <Hero />
        <About />
        <Features />
        <Chains />
        <Game />
      </main>
    </div>
  );
}

export default App;
