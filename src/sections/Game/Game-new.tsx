import React, { useState, useEffect, useRef, useCallback } from "react";
import "./Game.scss";

interface Position {
  x: number;
  y: number;
}

interface Meteor {
  id: number;
  x: number;
  y: number;
  speed: number;
  size: number;
}

interface Bullet {
  id: number;
  x: number;
  y: number;
}

const Game: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gamePaused, setGamePaused] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [playerPos, setPlayerPos] = useState<Position>({ x: 400, y: 500 });
  const [meteors, setMeteors] = useState<Meteor[]>([]);
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [difficulty, setDifficulty] = useState(1);

  const gameAreaRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>(0);
  const lastBulletTime = useRef<number>(0);
  const lastMeteorTime = useRef<number>(0);

  const GAME_WIDTH = 800;
  const GAME_HEIGHT = 600;
  const PLAYER_SIZE = 40;
  const BULLET_SPEED = 8;

  // Dynamic difficulty system
  const getDifficulty = () => {
    const level = Math.floor(score / 100) + 1; // Every 100 points = +1 level
    return {
      level,
      meteorSpawnRate: Math.max(800, 2000 - level * 200), // Faster spawning: 2s -> 0.8s
      meteorSpeed: 1 + level * 0.3, // Faster meteors: 1 -> 4+ speed
      meteorSize: Math.max(30, 50 - level * 2), // Smaller meteors: 50px -> 30px
      bulletRate: Math.max(150, 200 - level * 10), // Faster bullets: 200ms -> 150ms
    };
  };

  // Load high score from localStorage
  useEffect(() => {
    const savedHighScore = localStorage.getItem("spaceAI-highScore");
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
  }, []);

  // Save high score
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("spaceAI-highScore", score.toString());
    }
  }, [score, highScore]);

  // Keyboard controls for pause
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Escape") {
        e.preventDefault();
        if (gameStarted && !gameOver) {
          setGamePaused((prev) => !prev);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameStarted, gameOver]);

  // Mouse movement with smooth tracking
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!gameStarted || gameOver || gamePaused || !gameAreaRef.current)
        return;

      const rect = gameAreaRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      setPlayerPos({
        x: Math.max(
          0,
          Math.min(GAME_WIDTH - PLAYER_SIZE, mouseX - PLAYER_SIZE / 2)
        ),
        y: Math.max(
          0,
          Math.min(GAME_HEIGHT - PLAYER_SIZE, mouseY - PLAYER_SIZE / 2)
        ),
      });
    },
    [gameStarted, gameOver, gamePaused]
  );

  useEffect(() => {
    if (!gameStarted || gameOver || gamePaused) return;

    const gameArea = gameAreaRef.current;
    if (gameArea) {
      gameArea.addEventListener("mousemove", handleMouseMove);
      return () => gameArea.removeEventListener("mousemove", handleMouseMove);
    }
  }, [gameStarted, gameOver, gamePaused, handleMouseMove]);

  // Game loop with requestAnimationFrame
  const gameLoop = useCallback(
    (currentTime: number) => {
      if (!gameStarted || gameOver || gamePaused) return;

      const difficultySettings = getDifficulty();
      setDifficulty(difficultySettings.level);

      // Spawn bullets
      if (
        currentTime - lastBulletTime.current >
        difficultySettings.bulletRate
      ) {
        setBullets((prev) => [
          ...prev,
          {
            id: currentTime,
            x: playerPos.x + PLAYER_SIZE / 2,
            y: playerPos.y,
          },
        ]);
        lastBulletTime.current = currentTime;
      }

      // Spawn meteors with dynamic difficulty
      if (
        currentTime - lastMeteorTime.current >
        difficultySettings.meteorSpawnRate
      ) {
        setMeteors((prev) => [
          ...prev,
          {
            id: currentTime,
            x: Math.random() * (GAME_WIDTH - 60),
            y: -60,
            speed: difficultySettings.meteorSpeed + Math.random() * 1,
            size: difficultySettings.meteorSize + Math.random() * 10,
          },
        ]);
        lastMeteorTime.current = currentTime;
      }

      // Update bullets
      setBullets((prev) =>
        prev
          .map((bullet) => ({ ...bullet, y: bullet.y - BULLET_SPEED }))
          .filter((bullet) => bullet.y > -10)
      );

      // Update meteors
      setMeteors((prev) =>
        prev
          .map((meteor) => ({ ...meteor, y: meteor.y + meteor.speed }))
          .filter((meteor) => meteor.y < GAME_HEIGHT + 100)
      );

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    },
    [gameStarted, gameOver, gamePaused, playerPos, score]
  );

  useEffect(() => {
    if (gameStarted && !gameOver && !gamePaused) {
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameStarted, gameOver, gamePaused, gameLoop]);

  // Collision detection
  useEffect(() => {
    if (gamePaused) return;

    // Bullet-Meteor collisions
    setBullets((prevBullets) => {
      let newBullets = [...prevBullets];

      setMeteors((prevMeteors) => {
        let newMeteors = [...prevMeteors];

        newBullets.forEach((bullet) => {
          newMeteors.forEach((meteor, meteorIndex) => {
            if (
              bullet.x < meteor.x + meteor.size &&
              bullet.x + 5 > meteor.x &&
              bullet.y < meteor.y + meteor.size &&
              bullet.y + 10 > meteor.y
            ) {
              newMeteors.splice(meteorIndex, 1);
              newBullets = newBullets.filter((b) => b.id !== bullet.id);
              setScore((prev) => prev + 15);
            }
          });
        });

        return newMeteors;
      });

      return newBullets;
    });

    // Player-Meteor collisions
    meteors.forEach((meteor) => {
      if (
        playerPos.x < meteor.x + meteor.size &&
        playerPos.x + PLAYER_SIZE > meteor.x &&
        playerPos.y < meteor.y + meteor.size &&
        playerPos.y + PLAYER_SIZE > meteor.y
      ) {
        setGameOver(true);
      }
    });
  }, [bullets, meteors, playerPos, gamePaused]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setGamePaused(false);
    setScore(0);
    setDifficulty(1);
    setPlayerPos({ x: GAME_WIDTH / 2 - PLAYER_SIZE / 2, y: GAME_HEIGHT - 100 });
    setMeteors([]);
    setBullets([]);
    lastBulletTime.current = 0;
    lastMeteorTime.current = 0;
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameOver(false);
    setGamePaused(false);
    setScore(0);
    setDifficulty(1);
    setPlayerPos({ x: GAME_WIDTH / 2 - PLAYER_SIZE / 2, y: GAME_HEIGHT - 100 });
    setMeteors([]);
    setBullets([]);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  const togglePause = () => {
    if (gameStarted && !gameOver) {
      setGamePaused((prev) => !prev);
    }
  };

  return (
    <section id="game" className="game">
      <div className="game__container">
        <div className="game__header">
          <div className="game__badge">🎮 SPACE ARCADE</div>
          <h2 className="game__title">Meteor Storm</h2>
          <p className="game__subtitle">
            Survive the meteor storm! Move your mouse to navigate, auto-fire
            destroys meteors.
          </p>
        </div>

        <div className="game__arena" ref={gameAreaRef}>
          {!gameStarted && !gameOver && (
            <div className="game__menu">
              <h3>☄️ Welcome to Meteor Storm!</h3>
              <div className="game__controls">
                <p>
                  <strong>Controls:</strong>
                </p>
                <p>🔹 Mouse: Move spaceship</p>
                <p>🔹 Auto-fire: Destroys meteors</p>
                <p>🔹 Space/ESC: Pause game</p>
                <p>🔹 Survive as long as possible!</p>
                <p>
                  🔹 <strong>Difficulty increases every 100 points!</strong>
                </p>
              </div>
              <button onClick={startGame} className="game__start-btn">
                Start Mission 🚀
              </button>
              {highScore > 0 && (
                <div className="game__high-score">
                  High Score: {highScore} 🏆
                </div>
              )}
            </div>
          )}

          {gameStarted && !gameOver && (
            <div className="game__play-area">
              <div className="game__hud">
                <div className="game__score">Score: {score}</div>
                <div className="game__difficulty">Level: {difficulty}</div>
                <div className="game__high-score">Best: {highScore}</div>
              </div>

              {gamePaused && (
                <div className="game__pause-overlay">
                  <h3>⏸️ GAME PAUSED</h3>
                  <p>Press SPACE or ESC to continue</p>
                  <button onClick={togglePause} className="game__resume-btn">
                    Resume ▶️
                  </button>
                </div>
              )}

              {/* Player */}
              <div
                className="game__player"
                style={{
                  left: `${playerPos.x}px`,
                  top: `${playerPos.y}px`,
                  width: `${PLAYER_SIZE}px`,
                  height: `${PLAYER_SIZE}px`,
                }}
              >
                🚀
              </div>

              {/* Bullets */}
              {bullets.map((bullet) => (
                <div
                  key={bullet.id}
                  className="game__bullet"
                  style={{
                    left: `${bullet.x}px`,
                    top: `${bullet.y}px`,
                  }}
                >
                  ⚡
                </div>
              ))}

              {/* Meteors */}
              {meteors.map((meteor) => (
                <div
                  key={meteor.id}
                  className="game__meteor"
                  style={{
                    left: `${meteor.x}px`,
                    top: `${meteor.y}px`,
                    width: `${meteor.size}px`,
                    height: `${meteor.size}px`,
                  }}
                >
                  ☄️
                </div>
              ))}

              <div className="game__controls-hint">
                Move mouse to navigate | Auto-fire active | Space: Pause
              </div>

              <button onClick={togglePause} className="game__pause-btn">
                {gamePaused ? "▶️" : "⏸️"}
              </button>
            </div>
          )}

          {gameOver && (
            <div className="game__game-over">
              <h3>💥 Mission Failed!</h3>
              <div className="game__final-score">
                <p>
                  Final Score: <strong>{score}</strong>
                </p>
                <p>
                  Level Reached: <strong>{difficulty}</strong>
                </p>
                {score === highScore && score > 0 && (
                  <p className="new-record">🏆 New High Score!</p>
                )}
              </div>
              <div className="game__buttons">
                <button onClick={startGame} className="game__restart-btn">
                  Try Again 🔄
                </button>
                <button onClick={resetGame} className="game__menu-btn">
                  Main Menu 📋
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="game__stats">
          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-info">
              <div className="stat-number">{score}</div>
              <div className="stat-label">Current Score</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏆</div>
            <div className="stat-info">
              <div className="stat-number">{highScore}</div>
              <div className="stat-label">High Score</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">☄️</div>
            <div className="stat-info">
              <div className="stat-number">{Math.floor(score / 15)}</div>
              <div className="stat-label">Meteors Destroyed</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📈</div>
            <div className="stat-info">
              <div className="stat-number">{difficulty}</div>
              <div className="stat-label">Difficulty Level</div>
            </div>
          </div>
        </div>

        <div className="game__footer">
          <p>
            🌟 <strong>Meteor Storm</strong> - Survive the cosmic chaos, earn
            rewards!
          </p>
          <p>
            Mouse controls + Auto-fire | Pause: Space/ESC | Difficulty increases
            every 100 points
          </p>
        </div>
      </div>
    </section>
  );
};

export default Game;
