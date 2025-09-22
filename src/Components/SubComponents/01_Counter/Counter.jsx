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
      className="flex flex-col justify-center h-1/2 rounded-2xl border-4"
      style={{
        backgroundColor: palette.shade2,
        borderColor: palette.shade0,
      }}
    >
      <div
        className="text-3xl md:text-4xl m-3 text-center w-1/3 self-center p-3 rounded-lg"
        style={{
          color: palette.shade1,
          backgroundColor: palette.shade3,
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
