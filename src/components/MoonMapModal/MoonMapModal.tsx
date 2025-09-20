import React, { useEffect } from "react";
import "./MoonMapModal.scss";

interface MoonMapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MoonMapModal: React.FC<MoonMapModalProps> = ({ isOpen, onClose }) => {
  // ESC tuşu ile modal kapatma
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const moonPhases = [
    {
      phase: "🌑",
      name: "New Moon",
      description: "Fresh starts, deploy smart contracts",
    },
    {
      phase: "🌒",
      name: "Waxing Crescent",
      description: "HODL strong, accumulate more tokens",
    },
    {
      phase: "🌓",
      name: "First Quarter",
      description: "Technical analysis peaks here",
    },
    {
      phase: "🌔",
      name: "Waxing Gibbous",
      description: "Diamond hands formation complete",
    },
    {
      phase: "🌕",
      name: "Full Moon",
      description: "TO THE MOON! 🚀 Lambo incoming",
    },
    {
      phase: "🌖",
      name: "Waning Gibbous",
      description: "Profit taking, but still bullish",
    },
    {
      phase: "🌗",
      name: "Last Quarter",
      description: "Market correction, buy the dip",
    },
    {
      phase: "🌘",
      name: "Waning Crescent",
      description: "Paper hands exit, we stay strong",
    },
  ];

  const cryptoLocations = [
    {
      name: "Diamond Crater",
      coords: "69°N, 420°E",
      description: "Where diamond hands are forged",
    },
    {
      name: "HODL Valley",
      coords: "42°S, 69°W",
      description: "Never selling, only buying",
    },
    {
      name: "Lambo Landing Site",
      coords: "88°N, 180°E",
      description: "Future parking spot",
    },
    {
      name: "Ape Observatory",
      coords: "12°S, 420°W",
      description: "Ape intelligence research center",
    },
    {
      name: "Rocket Fuel Depot",
      coords: "33°N, 111°E",
      description: "Fuel for moon missions",
    },
  ];

  return (
    <div className="moon-modal-overlay">
      <div className="moon-modal" onClick={(e) => e.stopPropagation()}>
        <button className="moon-modal__close" onClick={onClose}>
          ✕
        </button>

        <div className="moon-modal__header">
          <h2>🌙 Official Moon Map</h2>
          <p>Your guide to lunar domination and crypto supremacy</p>
        </div>

        <div className="moon-modal__content">
          <div className="moon-map">
            <div className="moon-surface">
              <div className="moon-emoji">🌕</div>
              {cryptoLocations.map((location, index) => (
                <div
                  key={index}
                  className={`location-marker location-${index + 1}`}
                  title={location.description}
                >
                  <span className="marker">📍</span>
                  <div className="location-info">
                    <h4>{location.name}</h4>
                    <p>{location.coords}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="moon-phases">
            <h3>🌙 Moon Phases & Market Strategy</h3>
            <div className="phases-grid">
              {moonPhases.map((phase, index) => (
                <div key={index} className="phase-card">
                  <div className="phase-icon">{phase.phase}</div>
                  <h4>{phase.name}</h4>
                  <p>{phase.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="moon-facts">
            <h3>🚀 Moon Mission Facts</h3>
            <div className="facts-grid">
              <div className="fact-card">
                <div className="fact-icon">🦍</div>
                <h4>Ape Army Size</h4>
                <p>69,420 diamond hands strong</p>
              </div>
              <div className="fact-card">
                <div className="fact-icon">💎</div>
                <h4>Diamond Formation</h4>
                <p>Forged under 100x pressure</p>
              </div>
              <div className="fact-card">
                <div className="fact-icon">🚀</div>
                <h4>Rocket Fuel</h4>
                <p>100% pure hopium & memes</p>
              </div>
              <div className="fact-card">
                <div className="fact-icon">🌙</div>
                <h4>Moon Distance</h4>
                <p>0% - We're already there!</p>
              </div>
            </div>
          </div>

          <div className="moon-disclaimer">
            <p>
              ⚠️ <strong>Disclaimer:</strong> This is not financial advice.
              We're just apes who like the moon. DYOR (Do Your Own Research)
              before yeeting your life savings into space coins. Moon mission
              success rate: 420.69% 🚀
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoonMapModal;
