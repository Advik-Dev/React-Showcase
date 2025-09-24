import { useState } from "react";
import Button from "./Button";
import { useColor } from "../../ColorContext/ColorContext";

function Counter() {
  const [counter, setCounter] = useState(0);
  const { palette } = useColor();

  function addVal() {
    setCounter(counter + 1);
  }

  function removeVal() {
    if (counter > 0) setCounter(counter - 1);
  }

  return (
    <div
      className="flex flex-col justify-center rounded-2xl border-2"
      style={{
        backgroundColor: palette.bgshade1,
        borderColor: palette.bordershade,
      }}
    >
      <div
        className="text-3xl md:text-4xl m-3 text-center w-full self-center p-3 rounded-lg transition"
        style={{
          color: palette.shade2,
        }}
      >
        {counter}
      </div>
      <div className="flex gap-3 p-4">
        <Button onClick={addVal} text="Add" />
        <Button onClick={removeVal} text="Remove" />
      </div>
    </div>
  );
}

export default Counter;
