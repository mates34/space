import React, { useState, useEffect } from "react";
import "./Navbar.scss";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ["home", "about"];
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
          <button className="navbar__link">Features</button>
          <button className="navbar__link">Contact</button>
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
