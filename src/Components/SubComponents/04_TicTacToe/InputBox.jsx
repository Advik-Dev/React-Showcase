import { useState, forwardRef, useImperativeHandle } from "react";
import { useColor } from "../../ColorContext/ColorContext";

const InputBox = forwardRef(function InputBox(
  {
    value,
    playerO,
    playerX,
    setPlayerO,
    setPlayerX,
    gameCondition,
    setGameCondition,
    isDisabled,
  },
  ref
) {
  const { palette } = useColor();
  const [buttonVal, setButtonVal] = useState("");

  useImperativeHandle(ref, () => ({
    reset: () => setButtonVal(""),
    click: () => handleClick({ target: { value } }),
  }));

  const handleClick = (e) => {
    if (["Owins", "Xwins", "Draw"].includes(gameCondition)) return;

    let value = Number(e.target.value);

    if (playerX.has(value)) {
      setButtonVal("x");
    } else if (playerO.has(value)) {
      setButtonVal("o");
    } else {
      if (gameCondition == "Oturn") {
        setPlayerO((prev) => new Set([...prev, value]));
        setButtonVal("o");
        setGameCondition("Xturn");
      } else if (gameCondition == "Xturn" || gameCondition == "NewGame") {
        setPlayerX((prev) => new Set([...prev, value]));
        setButtonVal("x");
        setGameCondition("Oturn");
      }
    }
  };

  return (
    <button
      ref={ref}
      value={value}
      onClick={handleClick}
      disabled={isDisabled}
      className="h-15 w-15 border-2 text-5xl font-geo"
      style={{
        backgroundColor: palette.bgshade2,
        borderColor: palette.bgshade4,
        color: palette.shade2,
      }}
    >
      {buttonVal}
    </button>
  );
});

export default InputBox;
