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

interface PowerUp {
  id: number;
  x: number;
  y: number;
  type: "doubleShot" | "rapidFire";
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
  const [powerUps, setPowerUps] = useState<PowerUp[]>([]);
  const [difficulty, setDifficulty] = useState(1);
  const [weaponLevel, setWeaponLevel] = useState(1);
  const [doubleShot, setDoubleShot] = useState(false);
  const [rapidFire, setRapidFire] = useState(false);

  const gameAreaRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>(0);
  const lastBulletTime = useRef<number>(0);
  const lastMeteorTime = useRef<number>(0);
  const lastPowerUpTime = useRef<number>(0);

  const GAME_WIDTH = 800;
  const GAME_HEIGHT = 600;
  const PLAYER_SIZE = 40;
  const BULLET_SPEED = 8;

  // Dynamic difficulty system with weapon upgrades
  const getDifficulty = () => {
    const level = Math.floor(score / 100) + 1; // Every 100 points = +1 level
    const weaponUpgrade = Math.floor(level / 2) + 1; // Weapon upgrades every 2 levels

    return {
      level,
      weaponLevel: weaponUpgrade,
      meteorSpawnRate: Math.max(800, 2000 - level * 200), // Faster spawning: 2s -> 0.8s
      meteorSpeed: 1 + level * 0.3, // Faster meteors: 1 -> 4+ speed
      meteorSize: Math.max(30, 50 - level * 2), // Smaller meteors: 50px -> 30px
      bulletRate: Math.max(100, 200 - weaponUpgrade * 15), // Faster bullets with weapon level
      powerUpSpawnRate: Math.max(5000, 10000 - level * 500), // Power-ups spawn more often
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
      if (e.key === "Escape") {
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
      if (!gameStarted || gameOver || gamePaused) {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        return;
      }

      const difficultySettings = getDifficulty();
      setDifficulty(difficultySettings.level);
      setWeaponLevel(difficultySettings.weaponLevel);

      // Spawn bullets (double shot if upgraded)
      if (
        currentTime - lastBulletTime.current >
        difficultySettings.bulletRate
      ) {
        const bulletX = playerPos.x + PLAYER_SIZE / 2;
        const bulletY = playerPos.y;

        if (doubleShot || difficultySettings.weaponLevel >= 3) {
          // Double shot
          setBullets((prev) => [
            ...prev,
            { id: currentTime, x: bulletX - 8, y: bulletY },
            { id: currentTime + 0.1, x: bulletX + 8, y: bulletY },
          ]);
        } else {
          // Single shot
          setBullets((prev) => [
            ...prev,
            { id: currentTime, x: bulletX, y: bulletY },
          ]);
        }
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

      // Spawn power-ups occasionally
      if (
        currentTime - lastPowerUpTime.current >
        difficultySettings.powerUpSpawnRate
      ) {
        const powerUpTypes: ("doubleShot" | "rapidFire")[] = [
          "doubleShot",
          "rapidFire",
        ];
        setPowerUps((prev) => [
          ...prev,
          {
            id: currentTime,
            x: Math.random() * (GAME_WIDTH - 40),
            y: -40,
            type: powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)],
          },
        ]);
        lastPowerUpTime.current = currentTime;
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

      // Update power-ups
      setPowerUps((prev) =>
        prev
          .map((powerUp) => ({ ...powerUp, y: powerUp.y + 2 }))
          .filter((powerUp) => powerUp.y < GAME_HEIGHT + 100)
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
    if (gamePaused || gameOver || !gameStarted) return;

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

    // Player-PowerUp collisions
    powerUps.forEach((powerUp, index) => {
      if (
        playerPos.x < powerUp.x + 30 &&
        playerPos.x + PLAYER_SIZE > powerUp.x &&
        playerPos.y < powerUp.y + 30 &&
        playerPos.y + PLAYER_SIZE > powerUp.y
      ) {
        // Collect power-up
        setPowerUps((prev) => prev.filter((_, i) => i !== index));

        if (powerUp.type === "doubleShot") {
          setDoubleShot(true);
          setTimeout(() => setDoubleShot(false), 10000); // 10 seconds
        } else if (powerUp.type === "rapidFire") {
          setRapidFire(true);
          setTimeout(() => setRapidFire(false), 8000); // 8 seconds
        }

        setScore((prev) => prev + 25); // Bonus for collecting power-up
      }
    });

    // Player-Meteor collisions (GAME OVER)
    meteors.forEach((meteor) => {
      if (
        playerPos.x < meteor.x + meteor.size - 10 &&
        playerPos.x + PLAYER_SIZE > meteor.x + 10 &&
        playerPos.y < meteor.y + meteor.size - 10 &&
        playerPos.y + PLAYER_SIZE > meteor.y + 10
      ) {
        console.log("COLLISION DETECTED! Game Over!");
        setGameOver(true);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      }
    });
  }, [bullets, meteors, powerUps, playerPos, gamePaused, gameOver, gameStarted]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setGamePaused(false);
    setScore(0);
    setDifficulty(1);
    setWeaponLevel(1);
    setDoubleShot(false);
    setRapidFire(false);
    setPlayerPos({ x: GAME_WIDTH / 2 - PLAYER_SIZE / 2, y: GAME_HEIGHT - 100 });
    setMeteors([]);
    setBullets([]);
    setPowerUps([]);
    lastBulletTime.current = 0;
    lastMeteorTime.current = 0;
    lastPowerUpTime.current = 0;
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameOver(false);
    setGamePaused(false);
    setScore(0);
    setDifficulty(1);
    setWeaponLevel(1);
    setDoubleShot(false);
    setRapidFire(false);
    setPlayerPos({ x: GAME_WIDTH / 2 - PLAYER_SIZE / 2, y: GAME_HEIGHT - 100 });
    setMeteors([]);
    setBullets([]);
    setPowerUps([]);
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
                <p>🔹 ESC: Pause/Resume game</p>
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
                <div className="game__weapon">Weapon: {weaponLevel}</div>
                <div className="game__high-score">Best: {highScore}</div>
                {doubleShot && (
                  <div className="game__powerup">🔥 Double Shot</div>
                )}
                {rapidFire && (
                  <div className="game__powerup">⚡ Rapid Fire</div>
                )}
              </div>

              {gamePaused && (
                <div className="game__pause-overlay">
                  <h3>⏸️ GAME PAUSED</h3>
                  <p>Press ESC to continue</p>
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

              {/* Power-ups */}
              {powerUps.map((powerUp) => (
                <div
                  key={powerUp.id}
                  className="game__powerup-item"
                  style={{
                    left: `${powerUp.x}px`,
                    top: `${powerUp.y}px`,
                  }}
                >
                  {powerUp.type === "doubleShot" ? "🔥" : "⚡"}
                </div>
              ))}

              <div className="game__controls-hint">
                Move mouse to navigate | Weapon Lv.{weaponLevel} | Collect
                power-ups | ESC: Pause
              </div>
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
            <div className="stat-icon">�</div>
            <div className="stat-info">
              <div className="stat-number">{weaponLevel}</div>
              <div className="stat-label">Weapon Level</div>
            </div>
          </div>
        </div>

        <div className="game__footer">
          <p>
            🌟 <strong>Meteor Storm</strong> - Survive meteors, collect
            power-ups, upgrade weapons!
          </p>
          <p>
            Mouse controls + Auto-fire | Pause: ESC | Weapons upgrade every 2
            levels | Collect 🔥⚡ power-ups
          </p>
        </div>
      </div>
    </section>
  );
};

export default Game;
