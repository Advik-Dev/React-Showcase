import Tile from "./Tile";
import { opposites, keyToDirection } from "./otherData.js";
import { useState, useEffect, useRef, useCallback } from "react";
import Dpad from "./Dpad.jsx";

function Snake() {
  const boardSize = 15;
  const playerSize = 7;

  const [buttonName, setButtonName] = useState("Start");

  const [tiles, setTiles] = useState(
    Array.from({ length: boardSize }, () => Array(boardSize).fill(0))
  );
  const [player, setPlayer] = useState(
    Array.from({ length: 5 }, (_, i) => [playerSize + i, playerSize])
  );
  const [score, setScore] = useState(0);
  const [apple, setApple] = useState([7, 7]);
  const [_isGameOver, setIsGameOver] = useState(false);
  const [intervalTime, setIntervalTime] = useState(300); // ms

  const direction = useRef("none");
  const gameRunning = useRef(null);
  const canChangeDirection = useRef(false);
  const appleRef = useRef([7, 7]);

  useEffect(() => {
    appleRef.current = apple;
  }, [apple]);

  // Utils
  function hasDuplicateArrays(arr) {
    const seen = new Set();
    for (const sub of arr) {
      const key = JSON.stringify(sub);
      if (seen.has(key)) return true;
      seen.add(key);
    }
    return false;
  }

  function isOverlappingWall(coords) {
    const [x, y] = coords[0]; // head
    return x < 0 || x >= boardSize || y < 0 || y >= boardSize;
  }

  function randomApple(snake) {
    let newApple;
    do {
      newApple = [
        Math.floor(Math.random() * boardSize),
        Math.floor(Math.random() * boardSize),
      ];
    } while (snake.some(([x, y]) => x === newApple[0] && y === newApple[1]));
    return newApple;
  }

  // Main Fn

  const updateBoard = useCallback(() => {
    setPlayer((prev) => {
      let newPlayer = [...prev];
      let [x, y] = newPlayer[0]; // Head Coords

      if (direction.current === "north") x -= 1;
      else if (direction.current === "south") x += 1;
      else if (direction.current === "east") y += 1;
      else if (direction.current === "west") y -= 1;

      newPlayer.unshift([x, y]);

      // Check apple
      const [ax, ay] = appleRef.current;
      const ateApple = x === ax && y === ay;
      if (!ateApple) {
        newPlayer.pop(); // tail moves only if no apple eaten
      }

      // Player / Wall Collision check
      if (hasDuplicateArrays(newPlayer) || isOverlappingWall(newPlayer)) {
        stopGame();
        setIsGameOver(true);
        setButtonName("Restart");

        // Set HighScore
        const highScore = Number(localStorage.getItem("snakeHS")) || 0;
        if (score > highScore) {
          localStorage.setItem("snakeHS", score);
        }

        return prev; // freeze snake at last safe state
      }

      // If apple eaten, spawn a new one
      if (ateApple) {
        setIntervalTime((t) => Math.max(50, t - 20));
        const nextApple = randomApple(newPlayer);
        appleRef.current = nextApple;
        setApple(nextApple);
        setScore((s) => s + 1);
      }

      return newPlayer;
    });
  }, [score]);

  // Set New Tiles
  useEffect(() => {
    const newTiles = Array.from({ length: boardSize }, () =>
      Array(boardSize).fill(0)
    );

    // apple
    newTiles[apple[0]][apple[1]] = 2;

    // snake
    for (const [px, py] of player) newTiles[px][py] = 1;
    setTiles(newTiles);
  }, [player, apple]);

  const startGame = () => {
    setIntervalTime(300);
    // reset snake
    const startingSnake = Array.from({ length: 5 }, (_, i) => [
      playerSize + i,
      playerSize,
    ]);
    setPlayer(startingSnake);
    direction.current = "north";
    setScore(0);
    setIsGameOver(false);

    // place apple not overlapping the snake
    const startApple = randomApple(startingSnake);
    appleRef.current = startApple;
    setApple(startApple);

    // (re)start interval
    if (gameRunning.current) {
      clearInterval(gameRunning.current);
      gameRunning.current = null;
    }
    gameRunning.current = setInterval(() => {
      updateBoard();
      canChangeDirection.current = true;
    }, intervalTime);
  };

  const stopGame = () => {
    if (gameRunning.current) {
      clearInterval(gameRunning.current);
      gameRunning.current = null;
    }
  };

  const setDirection = (newDir) => {
    if (!gameRunning.current || !canChangeDirection.current) return;
    if (direction.current !== opposites[newDir]) {
      direction.current = newDir;
      canChangeDirection.current = false;
    }
  };

  useEffect(() => {
    if (gameRunning.current) {
      clearInterval(gameRunning.current);
      gameRunning.current = setInterval(() => {
        updateBoard();
        canChangeDirection.current = true;
      }, intervalTime);
    }

    return () => clearInterval(gameRunning.current);
  }, [intervalTime, updateBoard]);

  // Key listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key in keyToDirection) setDirection(keyToDirection[e.key]);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => stopGame();
  }, []);

  return (
    <div className="bg-gray-900 min-w-80 md:min-w-100 lg:min-w-140 rounded-2xl flex lg:flex-row flex-col items-center justify-center relative">
      <div className="border-3 border-green-400 md:m-10 m-4">
        <div className="grid grid-cols-15">
          {tiles.flat().map((type, index) => (
            <Tile key={index} tileID={index} type={type} />
          ))}
        </div>
      </div>
      <div className="flex mb-5 md:items-center flex-col items-center text-center">
        <div className="mb-5 text-green-400 font-bold text-4xl">
          - {score} -
          <div className="text-gray-500 text-sm text-center">
            High Score - {localStorage.getItem("snakeHS") || 0}
          </div>
        </div>
        <Dpad setDirection={setDirection} />
        <button
          className={`
            px-4 py-2 rounded-xl text-black bg-green-400
            hover:bg-green-500 hover:ring-2 hover:ring-green-300
            active:scale-95 transition-all duration-300 ease-in-out
            shadow-md hover:shadow-lg select-none
            transform absolute bottom-5 right-5
            ${gameRunning.current ? "scale-0" : "scale-100"}
          `}
          onClick={startGame}
        >
          {buttonName}
        </button>
      </div>
    </div>
  );
}

export default Snake;
