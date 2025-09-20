import "./Hero.scss";
import SaturnPlanet from "../../components/SaturnPlanet/SaturnPlanet";

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero__content">
        <h1 className="hero__title">Space AI</h1>
        <p className="hero__subtitle">
          Exploring the Future of Artificial Intelligence
        </p>
        <p className="hero__description">
          Where cosmic innovation meets intelligent technology to unlock the
          mysteries of the universe
        </p>
      </div>

      {/* Saturn Planet */}
      <SaturnPlanet />

      {/* Dark to Light Effect */}
      <div className="hero__darkness-fade"></div>

      {/* Background Stars - Küçük yıldızlar */}
      <div className="hero__background-stars"></div>

      {/* Star Layers */}
      <div className="hero__stars-layer-1"></div>
      <div className="hero__stars-layer-2"></div>
      <div className="hero__stars-layer-3"></div>
      <div className="hero__real-stars-overlay"></div>
      <div className="hero__twinkling"></div>
    </section>
  );
};

export default Hero;
