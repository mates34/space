import React, { useEffect, useState } from "react";
import "./Loading.scss";

interface LoadingProps {
  progress?: number;
}

const Loading: React.FC<LoadingProps> = ({ progress = 0 }) => {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing systems...");

  useEffect(() => {
    // Smooth progress animation
    const animate = () => {
      setDisplayProgress((prev) => {
        const diff = progress - prev;
        return prev + diff * 0.1;
      });
    };

    const interval = setInterval(animate, 16); // 60fps
    return () => clearInterval(interval);
  }, [progress]);

  useEffect(() => {
    // Change loading text based on progress
    if (displayProgress < 20) {
      setLoadingText("Initializing systems...");
    } else if (displayProgress < 40) {
      setLoadingText("Loading space modules...");
    } else if (displayProgress < 60) {
      setLoadingText("Calibrating instruments...");
    } else if (displayProgress < 80) {
      setLoadingText("Preparing for launch...");
    } else if (displayProgress < 100) {
      setLoadingText("Final checks...");
    } else {
      setLoadingText("Mission ready!");
    }
  }, [displayProgress]);

  return (
    <div className="loading">
      <div className="loading__container">
        <div className="loading__logo">
          <div className="loading__logo-icon">🚀</div>
          <h1 className="loading__logo-text">Space AI</h1>
        </div>

        <div className="loading__progress">
          <div className="loading__progress-bar">
            <div
              className="loading__progress-fill"
              style={{ width: `${Math.min(100, displayProgress)}%` }}
            ></div>
          </div>
          <div className="loading__percentage">
            {Math.round(Math.min(100, displayProgress))}%
          </div>
        </div>

        <div className="loading__text">{loadingText}</div>

        <div className="loading__stars">
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
