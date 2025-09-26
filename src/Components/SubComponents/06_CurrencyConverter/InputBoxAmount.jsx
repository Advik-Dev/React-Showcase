import { useId } from "react";
import { useColor } from "../../../context/ColorContext/ColorContext";

function InputBoxAmount({ className, label, value, amt, setAmt }) {
  const { palette } = useColor();
  const inputId = useId();

  return (
    <label
      htmlFor={inputId}
      className={`${className} relative flex flex-col px-3 py-2 rounded-2xl cursor-text shadow-sm`}
      style={{ backgroundColor: palette.bgshade4 }}
    >
      <span
        className="absolute top-1 left-3 text-sm"
        style={{ color: palette.shade4 }}
      >
        {label}
      </span>
      <input
        id={inputId}
        type="text"
        className="mt-4 w-full bg-transparent border-none outline-none text-base"
        value={amt}
        onChange={(e) => {
          const value = e.target.value;
          if (/^\d*\.?\d*$/.test(value)) {
            setAmt(value); // reminder! is a string
          }
        }}
      />
    </label>
  );
}

export default InputBoxAmount;
