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
        setTimeout(() => setLoading(false), 800);
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
    return <Loading progress={progress} />;
  }

  return (
    <div className="app">
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
