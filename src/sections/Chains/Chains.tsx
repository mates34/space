import React from "react";
import "./Chains.scss";

const Chains: React.FC = () => {
  const chainData = [
    {
      name: "Ethereum",
      symbol: "ETH",
      icon: "⟠",
      color: "#627EEA",
      price: "$3,247.82",
      change: "+5.24%",
      contract: "0x...",
      description: "The original smart contract platform",
      uniswapUrl: "https://app.uniswap.org/#/swap?outputCurrency=ETH",
    },
    {
      name: "Polygon",
      symbol: "MATIC",
      icon: "⬡",
      color: "#8247E5",
      price: "$0.87",
      change: "+12.45%",
      contract: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
      description: "Layer 2 scaling solution for Ethereum",
      uniswapUrl:
        "https://app.uniswap.org/#/swap?outputCurrency=0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
    },
    {
      name: "Binance Smart Chain",
      symbol: "BNB",
      icon: "◉",
      color: "#F3BA2F",
      price: "$634.21",
      change: "+8.73%",
      contract: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      description: "Fast and low-cost blockchain network",
      uniswapUrl:
        "https://app.uniswap.org/#/swap?outputCurrency=0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
    },
    {
      name: "Arbitrum",
      symbol: "ARB",
      icon: "◈",
      color: "#28A0F0",
      price: "$1.23",
      change: "+15.67%",
      contract: "0x912CE59144191C1204E64559FE8253a0e49E6548",
      description: "Optimistic rollup for Ethereum scaling",
      uniswapUrl:
        "https://app.uniswap.org/#/swap?outputCurrency=0x912CE59144191C1204E64559FE8253a0e49E6548",
    },
    {
      name: "Optimism",
      symbol: "OP",
      icon: "○",
      color: "#FF0420",
      price: "$2.45",
      change: "+9.12%",
      contract: "0x4200000000000000000000000000000000000042",
      description: "Layer 2 optimistic rollup solution",
      uniswapUrl:
        "https://app.uniswap.org/#/swap?outputCurrency=0x4200000000000000000000000000000000000042",
    },
    {
      name: "Avalanche",
      symbol: "AVAX",
      icon: "△",
      color: "#E84142",
      price: "$42.67",
      change: "+18.93%",
      contract: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
      description: "High-throughput smart contracts platform",
      uniswapUrl:
        "https://app.uniswap.org/#/swap?outputCurrency=0x85f138bfEE4ef8e540890CFb48F620571d67Eda3",
    },
    {
      name: "Solana",
      symbol: "SOL",
      icon: "◐",
      color: "#9945FF",
      price: "$198.45",
      change: "+22.34%",
      contract: "So11111111111111111111111111111111111111112",
      description: "Fast, decentralized blockchain network",
      uniswapUrl:
        "https://app.uniswap.org/#/swap?outputCurrency=0xD31a59c85aE9D8edEFeC411D448f90841571b89c",
    },
    {
      name: "Cardano",
      symbol: "ADA",
      icon: "◎",
      color: "#0033AD",
      price: "$0.52",
      change: "+7.89%",
      contract: "addr1...",
      description: "Research-driven blockchain platform",
      uniswapUrl:
        "https://app.uniswap.org/#/swap?outputCurrency=0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47",
    },
  ];

  const handleChainClick = (uniswapUrl: string) => {
    window.open(uniswapUrl, "_blank");
  };

  return (
    <section id="chains" className="chains">
      <div className="chains__container">
        <div className="chains__header">
          <div className="chains__badge">🌐 MULTI-CHAIN UNIVERSE</div>
          <h2 className="chains__title">Supported Blockchain Networks</h2>
          <p className="chains__subtitle">
            Trade across multiple blockchains with seamless integration. One
            click to Uniswap, infinite possibilities to the moon! 🚀
          </p>
        </div>

        <div className="chains__grid">
          {chainData.map((chain, index) => (
            <div
              key={index}
              className="chain-card"
              onClick={() => handleChainClick(chain.uniswapUrl)}
            >
              <div className="chain-card__header">
                <div
                  className="chain-card__icon"
                  style={{ color: chain.color }}
                >
                  {chain.icon}
                </div>
                <div className="chain-card__info">
                  <h3 className="chain-card__name">{chain.name}</h3>
                  <span className="chain-card__symbol">{chain.symbol}</span>
                </div>
                <div className="chain-card__price">
                  <span className="price">{chain.price}</span>
                  <span
                    className={`change ${
                      chain.change.startsWith("+") ? "positive" : "negative"
                    }`}
                  >
                    {chain.change}
                  </span>
                </div>
              </div>

              <div className="chain-card__description">
                <p>{chain.description}</p>
              </div>

              <div className="chain-card__contract">
                <span className="contract-label">Contract:</span>
                <span className="contract-address">{chain.contract}</span>
              </div>

              <div className="chain-card__footer">
                <div className="trade-button">
                  <span>Trade on Uniswap</span>
                  <span className="arrow">→</span>
                </div>
                <div className="chain-badge">
                  <span>🦄 UNI</span>
                </div>
              </div>

              <div
                className="chain-card__glow"
                style={{
                  background: `linear-gradient(135deg, ${chain.color}20, transparent)`,
                }}
              ></div>
            </div>
          ))}
        </div>

        <div className="chains__footer">
          <div className="footer-stats">
            <div className="stat-item">
              <span className="stat-number">8+</span>
              <span className="stat-label">Supported Networks</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">$42B+</span>
              <span className="stat-label">Total Liquidity</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Always Trading</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">∞</span>
              <span className="stat-label">To The Moon</span>
            </div>
          </div>

          <div className="footer-disclaimer">
            <p>
              🚨 <strong>Degen Alert:</strong> These prices are more volatile
              than a rocket launch! Always DYOR before aping in. Not financial
              advice, just pure hopium! Diamond hands recommended 💎🙌
            </p>
          </div>
        </div>
      </div>

      {/* Animated background elements */}
      <div className="chains__bg-elements">
        <div className="floating-coin coin-1">◈</div>
        <div className="floating-coin coin-2">⟠</div>
        <div className="floating-coin coin-3">◉</div>
        <div className="floating-coin coin-4">△</div>
        <div className="floating-coin coin-5">○</div>
      </div>
    </section>
  );
};

export default Chains;
