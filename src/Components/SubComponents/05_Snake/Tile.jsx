import React from "react";
import { useColor } from "../../ColorContext/ColorContext";
import { TbBackground } from "react-icons/tb";

function Tile({ tileID, type }) {
  const { palette } = useColor();
  let tile = (
    <div
      id={tileID}
      className="w-5 h-5 border-1 opacity-10"
      style={{ borderColor: palette.shade4 }}
    ></div>
  );

  if (type == 1) {
    tile = (
      <div
        id={tileID}
        className="w-5 h-5 border-1"
        style={{ borderColor: palette.shade3, backgroundColor: palette.shade3 }}
      ></div>
    );
  } else if (type == 2) {
    tile = (
      <div
        id={tileID}
        className="w-5 h-5 border-1 border-red-500 bg-red-500"
      ></div>
    );
  }

  return tile;
}

export default Tile;
