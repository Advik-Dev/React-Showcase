import { useState } from "react";
import Button from "./Button";

function Counter() {
  const [counter, setCounter] = useState(0);

  function addVal() {
    setCounter(counter + 1);
  }

  function removeVal() {
    if (counter > 0) setCounter(counter - 1);
  }

  return (
    <>
      <div className="flex flex-col justify-center h-1/2 bg-gray-900 rounded-2xl border-4 border-gray-700">
        <div className="text-3xl md:text-4xl m-3 text-center text-white w-1/3 self-center p-3">
          {counter}
        </div>
        <div className="flex gap-3 p-4">
          <Button onClick={addVal} text="Add" />
          <Button onClick={removeVal} text="Remove" />
        </div>
      </div>
    </>
  );
}

export default Counter;
