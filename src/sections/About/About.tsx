import React from "react";
import "./About.scss";

const About: React.FC = () => {
  return (
    <section id="about" className="about">
      <div className="about__container">
        <div className="about__content">
          <div className="about__header">
            <div className="about__badge">🚀 HODL TO THE MOON 🌙</div>
            <h2 className="about__title">Join the Space Ape Army!</h2>
            <p className="about__subtitle">
              We're not just going to space, we're taking the entire crypto
              community with us! Diamond hands only, paper hands stay on Earth!
              💎🙌
            </p>
          </div>

          {/* Memecoin Stats */}
          <div className="about__meme-stats">
            <div className="about__stat">
              <span className="about__stat-emoji">🚀</span>
              <span className="about__stat-value">420,690</span>
              <span className="about__stat-label">Space Apes</span>
            </div>
            <div className="about__stat">
              <span className="about__stat-emoji">💎</span>
              <span className="about__stat-value">69%</span>
              <span className="about__stat-label">Diamond Hands</span>
            </div>
            <div className="about__stat">
              <span className="about__stat-emoji">🌙</span>
              <span className="about__stat-value">∞</span>
              <span className="about__stat-label">Moon Distance</span>
            </div>
          </div>

          {/* Main Features Grid */}
          <div className="about__features">
            <div className="about__feature about__feature--ai">
              <div className="about__feature-icon">�</div>
              <h3 className="about__feature-title">Ape Intelligence</h3>
              <p className="about__feature-description">
                Our AI is powered by the collective brain power of 420,000 space
                apes! No paper hands allowed in our neural networks. Only
                diamond brain computations! 🧠💎
              </p>
              <div className="about__feature-tech">
                <span>Diamond Hands AI</span>
                <span>Ape Neural Networks</span>
                <span>HODL Algorithms</span>
              </div>
            </div>

            <div className="about__feature about__feature--space">
              <div className="about__feature-icon">🚀</div>
              <h3 className="about__feature-title">Moon Rocket Tech</h3>
              <p className="about__feature-description">
                Our rockets are fueled by pure diamond hands energy and meme
                magic! Destination: Moon, Mars, and beyond! We don't stop till
                we're millionaires! 🌙💰
              </p>
              <div className="about__feature-tech">
                <span>Meme Propulsion</span>
                <span>HODL Fuel Systems</span>
                <span>Diamond Thrusters</span>
              </div>
            </div>

            <div className="about__feature about__feature--exploration">
              <div className="about__feature-icon">�</div>
              <h3 className="about__feature-title">Diamond Hand Rewards</h3>
              <p className="about__feature-description">
                The longer you HODL, the more space tokens you earn! Our staking
                system rewards true believers with moon tickets and asteroid
                mining rights! 💰🌟
              </p>
              <div className="about__feature-tech">
                <span>HODL Rewards</span>
                <span>Moon Staking</span>
                <span>Ape Dividends</span>
              </div>
            </div>
          </div>

          {/* Mission Cards */}
          <div className="about__missions">
            <div className="about__missions-header">
              <h3>🚀 Moon Missions in Progress</h3>
              <p>Our diamond-handed apes are conquering the galaxy!</p>
            </div>
            <div className="about__missions-grid">
              <div className="about__mission about__mission--mars">
                <div className="about__mission-planet">♂️</div>
                <h4>Mars AI Colony</h4>
                <p>Autonomous habitat management and resource optimization</p>
                <div className="about__mission-status">Active</div>
              </div>
              <div className="about__mission about__mission--moon">
                <div className="about__mission-planet">🌙</div>
                <h4>Lunar Mining AI</h4>
                <p>Intelligent extraction and processing systems</p>
                <div className="about__mission-status">Deploying</div>
              </div>
              <div className="about__mission about__mission--asteroid">
                <div className="about__mission-planet">☄️</div>
                <h4>Asteroid Survey</h4>
                <p>Deep space reconnaissance and mineral analysis</p>
                <div className="about__mission-status">Planning</div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="about__stats">
            <div className="about__stat">
              <div className="about__stat-number">2,847</div>
              <div className="about__stat-label">AI Models Deployed</div>
            </div>
            <div className="about__stat">
              <div className="about__stat-number">156</div>
              <div className="about__stat-label">Space Missions</div>
            </div>
            <div className="about__stat">
              <div className="about__stat-number">89</div>
              <div className="about__stat-label">Planets Analyzed</div>
            </div>
            <div className="about__stat">
              <div className="about__stat-number">∞</div>
              <div className="about__stat-label">Possibilities</div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="about__cta">
            <h3>Ready to Explore the Future?</h3>
            <p>
              Join us in revolutionizing space exploration with artificial
              intelligence
            </p>
            <div className="about__cta-buttons">
              <button className="btn btn--primary">Start Your Journey</button>
              <button className="btn btn--secondary">View Documentation</button>
            </div>
          </div>
        </div>
      </div>

      {/* Star Layers - Hero ile aynı */}
      <div className="about__stars-layer-1"></div>
      <div className="about__stars-layer-2"></div>
      <div className="about__stars-layer-3"></div>
      <div className="about__background-stars"></div>
      <div className="about__twinkling"></div>
    </section>
  );
};

export default About;
