import React, { useState, useEffect } from "react";
import MoonMapModal from "../MoonMapModal/MoonMapModal";
import "./Navbar.scss";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMoonMapOpen, setIsMoonMapOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ["home", "about", "features"];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Modal açıkken body scroll'unu engelle
  useEffect(() => {
    if (isMoonMapOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Component unmount olurken temizle
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMoonMapOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__container">
        <a href="/" className="navbar__brand">
          <div className="navbar__logo">
            <img src="/logo.png" alt="Space AI Logo" className="logo-image" />
          </div>
          <span className="navbar__title">Space AI</span>
        </a>

        <div className="navbar__menu">
          <button
            onClick={() => scrollToSection("home")}
            className={`navbar__link ${
              activeSection === "home" ? "active" : ""
            }`}
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className={`navbar__link ${
              activeSection === "about" ? "active" : ""
            }`}
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("features")}
            className={`navbar__link ${
              activeSection === "features" ? "active" : ""
            }`}
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection("chains")}
            className={`navbar__link ${
              activeSection === "chains" ? "active" : ""
            }`}
          >
            Chains
          </button>
        </div>

        <div className="navbar__actions">
          <button
            onClick={() => setIsMoonMapOpen(true)}
            className="btn btn--secondary"
          >
            📜 Moon Map
          </button>
          <a href="#" className="btn btn--primary">
            🚀 Join Mission
          </a>
        </div>

        <button className="navbar__mobile-toggle">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <MoonMapModal
        isOpen={isMoonMapOpen}
        onClose={() => setIsMoonMapOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
