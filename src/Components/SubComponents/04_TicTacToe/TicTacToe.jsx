import { useState, useRef, useEffect } from "react";
import InputBox from "./InputBox";
import Emoji from "./Emoji";
import DialogueBox from "./DialogueBox";
import {
  smugWinEmoji,
  smugLossEmoji,
  smugWinPhrases,
  smugLosePhrases,
  drawEndPhrases,
  nextBattleAfterDraw,
  nextBattleAfterWin,
  nextBattleAfterLoss,
} from "./otherData";
import { useColor } from "../../ColorContext/ColorContext";

function TicTacToe() {
  const { palette } = useColor();
  const indexes = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const [playerX, setPlayerX] = useState(new Set());
  const [playerO, setPlayerO] = useState(new Set());

  const inputRefs = useRef([]);

  const [gameCondition, setGameCondition] = useState("NewGame");

  const [titleText, setTitleText] = useState("Let's play a game");

  const [emoji, setEmoji] = useState("😃");

  const [resetBtnDisplay, setResetBtnDisplay] = useState(false);

  const [isInputDisabled, setIsInputDisabled] = useState(false);

  const winConditions = new Array(
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  );

  const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];

  useEffect(() => {
    if (gameCondition !== "Oturn") return;

    const delay = Math.floor(Math.random() * 1000 + 500);

    const play = async () => {
      setIsInputDisabled(true);
      await new Promise((r) => setTimeout(r, delay));
      setIsInputDisabled(false);

      const filled = new Set([...playerX, ...playerO]);
      const empty = indexes.filter((i) => !filled.has(i));

      if (empty.length === 0) return;

      const choice = empty[Math.floor(Math.random() * empty.length)];
      inputRefs.current[choice - 1]?.click();
    };

    play();
  }, [gameCondition]);

  useEffect(() => {
    const isWinning = (playerSet) =>
      winConditions.some((condition) =>
        condition.every((val) => playerSet.has(val))
      );

    const totalMoves = playerX.size + playerO.size;

    if (isWinning(playerX)) {
      setGameCondition("Xwins");
      setTitleText(randomFrom(smugLosePhrases));
      setEmoji(randomFrom(smugLossEmoji));
      setResetBtnDisplay(true);
    } else if (isWinning(playerO)) {
      setGameCondition("Owins");
      setTitleText(randomFrom(smugWinPhrases));
      setEmoji(randomFrom(smugWinEmoji));
      setResetBtnDisplay(true);
    } else if (totalMoves === 9) {
      setGameCondition("Draw");
      const rngEndPhrase = randomFrom(drawEndPhrases);
      setTitleText(rngEndPhrase[0]);
      setEmoji(rngEndPhrase[1]);
      setResetBtnDisplay(true);
    } else {
      if (gameCondition == "Oturn" || gameCondition == "Xturn") {
        const nextTurn = totalMoves % 2 === 0 ? "Xturn" : "Oturn";
        setGameCondition(nextTurn);
        if (nextTurn === "Xturn") {
          setTitleText("Your Turn");
          setEmoji("😏");
        } else {
          setTitleText("Thinking...");
          setEmoji("🤔");
        }
      }
    }
  }, [playerX, playerO]);

  function handleResetClick() {
    setPlayerO(new Set());
    setPlayerX(new Set());

    inputRefs.current.forEach((ref) => {
      if (ref && typeof ref.reset === "function") {
        ref.reset();
      }
      setResetBtnDisplay(false);
    });

    // console.log(gameCondition);
    if (gameCondition == "Xwins") {
      const rngNextRoundPhrase = randomFrom(nextBattleAfterLoss);
      setTitleText(rngNextRoundPhrase[0]);
      setEmoji(rngNextRoundPhrase[1]);
    } else if (gameCondition == "Owins") {
      const rngNextRoundPhrase = randomFrom(nextBattleAfterWin);
      setTitleText(rngNextRoundPhrase[0]);
      setEmoji(rngNextRoundPhrase[1]);
    } else if (gameCondition == "Draw") {
      const rngNextRoundPhrase = randomFrom(nextBattleAfterDraw);
      setTitleText(rngNextRoundPhrase[0]);
      setEmoji(rngNextRoundPhrase[1]);
    } else {
      setTitleText("Alright, To the next game");
      setEmoji("😏");
    }
    setGameCondition("NewGame");
  }

  return (
    <div
      className="bg-gray-900 min-w-80 md:min-w-100 lg:min-w-140 rounded-2xl flex lg:flex-row flex-col items-center justify-center p-10 relative border-4"
      style={{
        backgroundColor: palette.shade2,
      }}
    >
      <div className=" m-3">
        <div
          className="grid grid-cols-3 border-2"
          style={{
            borderColor: palette.shade0,
          }}
        >
          {indexes.map((value, index) => (
            <InputBox
              key={value}
              value={value}
              playerO={playerO}
              playerX={playerX}
              setPlayerO={setPlayerO}
              setPlayerX={setPlayerX}
              gameCondition={gameCondition}
              setGameCondition={setGameCondition}
              isDisabled={isInputDisabled}
              ref={(el) => (inputRefs.current[index] = el)}
            />
          ))}
        </div>
      </div>
      <div className="flex-1/2 ml-3 flex items-center flex-col gap-3">
        <DialogueBox text={titleText} />
        <Emoji emoji={emoji} setEmoji={setEmoji} />

        <button
          className={`
            px-4 py-2 rounded-xl hover:ring-2
            active:scale-95 transition-all duration-300 ease-in-out
            shadow-md select-none
            transform absolute bottom-5 right-5
            ${
              resetBtnDisplay
                ? "opacity-100 scale-100 display-none"
                : "opacity-0 scale-90 pointer-events-none"
            }
          `}
          style={{
            backgroundColor: palette.shade1,
            borderColor: palette.shade0,
            color: palette.shade4,
          }}
          onClick={handleResetClick}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default TicTacToe;
