import React, { useState, useEffect } from "react";
import { useColor } from "../../ColorContext/ColorContext";

function InfoCard() {
  const { palette } = useColor();
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleClick = () => {
    if (disabled) return;

    setOpen(true);
    setDisabled(true);

    setTimeout(() => setOpen(false), 3000);
    setTimeout(() => setDisabled(false), 3000);
  };

  return (
    <div
      className={`opacity-0 md:opacity-100 absolute top-5 right-5 select-none transition-colors duration-300 ${
        disabled
          ? "text-gray-600"
          : "text-gray-500 cursor-pointer hover:text-gray-600"
      }`}
      onClick={handleClick}
    >
      ?
      <div
        className={`absolute bottom-3 left-1 w-40 p-2 rounded-md border-2
          transition-all duration-300
          ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        style={{
          backgroundColor: palette.bgshade4,
          color: palette.shade4,
          borderColor: palette.bordershade,
        }}
      >
        You can use W,A,S,D to control the snake
      </div>
    </div>
  );
}

export default InfoCard;
