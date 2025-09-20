import React from "react";
import "./About.scss";

const About: React.FC = () => {
  return (
    <section id="about" className="about">
      <div className="about__container">
        <div className="about__content">
          <div className="about__header">
            <div className="about__badge">🚀 Next Generation Technology</div>
            <h2 className="about__title">Pioneering Space AI Revolution</h2>
            <p className="about__subtitle">
              Where artificial intelligence meets the infinite possibilities of
              space exploration, creating solutions that were once only dreams
              in science fiction.
            </p>
          </div>

          {/* Main Features Grid */}
          <div className="about__features">
            <div className="about__feature about__feature--ai">
              <div className="about__feature-icon">🧠</div>
              <h3 className="about__feature-title">Advanced AI Systems</h3>
              <p className="about__feature-description">
                Our neural networks process vast amounts of cosmic data,
                enabling real-time decision making for autonomous space missions
                and deep space exploration.
              </p>
              <div className="about__feature-tech">
                <span>Machine Learning</span>
                <span>Neural Networks</span>
                <span>Deep Learning</span>
              </div>
            </div>

            <div className="about__feature about__feature--space">
              <div className="about__feature-icon">🌌</div>
              <h3 className="about__feature-title">Space Technology</h3>
              <p className="about__feature-description">
                Cutting-edge propulsion systems, quantum communication networks,
                and AI-driven spacecraft that adapt and evolve during their
                missions.
              </p>
              <div className="about__feature-tech">
                <span>Quantum Computing</span>
                <span>Ion Propulsion</span>
                <span>Satellite Networks</span>
              </div>
            </div>

            <div className="about__feature about__feature--exploration">
              <div className="about__feature-icon">🔭</div>
              <h3 className="about__feature-title">Deep Space Exploration</h3>
              <p className="about__feature-description">
                Autonomous probes equipped with AI that can make independent
                decisions, discover new phenomena, and transmit findings across
                vast distances.
              </p>
              <div className="about__feature-tech">
                <span>Autonomous Navigation</span>
                <span>Data Analysis</span>
                <span>Signal Processing</span>
              </div>
            </div>
          </div>

          {/* Mission Cards */}
          <div className="about__missions">
            <div className="about__missions-header">
              <h3>Active Missions</h3>
              <p>Currently deployed AI systems across the solar system</p>
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
