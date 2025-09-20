import React from "react";

const Features: React.FC = () => {
  const features = [
    {
      icon: "🧠",
      title: "Neural Processing",
      description:
        "Advanced AI algorithms process space data with unprecedented speed and accuracy.",
      points: [
        "Real-time data analysis",
        "Pattern recognition",
        "Predictive modeling",
      ],
    },
    {
      icon: "🚀",
      title: "Autonomous Navigation",
      description:
        "Self-navigating spacecraft systems for deep space exploration missions.",
      points: ["GPS-free navigation", "Obstacle avoidance", "Mission planning"],
    },
    {
      icon: "📡",
      title: "Satellite Network",
      description:
        "Global communication network connecting Earth to the farthest reaches of space.",
      points: [
        "High-speed transmission",
        "Global coverage",
        "Secure protocols",
      ],
    },
    {
      icon: "🔬",
      title: "Scientific Analysis",
      description:
        "Comprehensive analysis tools for astronomical research and discovery.",
      points: ["Spectral analysis", "Image processing", "Data visualization"],
    },
    {
      icon: "⚡",
      title: "Energy Management",
      description:
        "Efficient power systems optimized for long-duration space missions.",
      points: [
        "Solar optimization",
        "Battery management",
        "Power distribution",
      ],
    },
    {
      icon: "🌌",
      title: "Deep Space Exploration",
      description:
        "Technology enabling humanity's journey to distant stars and galaxies.",
      points: [
        "Long-range sensors",
        "Life support systems",
        "Communication arrays",
      ],
    },
  ];

  return (
    <section id="features" className="features">
      <div className="features__container">
        <div className="features__header">
          <h2 className="features__title">Advanced Space Technology</h2>
          <p className="features__subtitle">
            Cutting-edge AI solutions powering the next generation of space
            exploration
          </p>
        </div>

        <div className="features__grid">
          {features.map((feature, index) => (
            <div key={index} className="features__item">
              <div className="features__item-icon">{feature.icon}</div>
              <h3 className="features__item-title">{feature.title}</h3>
              <p className="features__item-description">
                {feature.description}
              </p>
              <ul className="features__item-points">
                {feature.points.map((point, pointIndex) => (
                  <li key={pointIndex}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="features__cta">
          <h3>Ready to Launch Your Mission?</h3>
          <p>
            Join thousands of space enthusiasts exploring the universe with
            Space AI
          </p>
          <button className="cta-button">
            Start Exploration
            <span className="button-icon">🚀</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;
