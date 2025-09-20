import React, { useState, useEffect } from "react";
import "./Navbar.scss";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__container">
        <a href="/" className="navbar__brand">
          <div className="navbar__logo">
            <div className="space-ai-icon">
              <div className="planet-ring"></div>
              <div className="ai-core"></div>
              <div className="orbit-1"></div>
              <div className="orbit-2"></div>
            </div>
          </div>
          <span className="navbar__title">Space AI</span>
        </a>

        <div className="navbar__menu">
          <a href="#home" className="navbar__link active">
            Home
          </a>
          <a href="#about" className="navbar__link">
            About
          </a>
          <a href="#tokenomics" className="navbar__link">
            Tokenomics
          </a>
          <a href="#roadmap" className="navbar__link">
            Roadmap
          </a>
          <a href="#community" className="navbar__link">
            Community
          </a>
        </div>

        <div className="navbar__actions">
          <a href="#" className="btn btn--secondary">
            Whitepaper
          </a>
          <a href="#" className="btn btn--primary">
            Launch App
          </a>
        </div>

        <button className="navbar__mobile-toggle">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
