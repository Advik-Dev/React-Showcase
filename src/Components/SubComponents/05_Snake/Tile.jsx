import React from "react";
import { useColor } from "../../../context/ColorContext/ColorContext";
import { TbBackground } from "react-icons/tb";

function Tile({ tileID, type }) {
  const { palette } = useColor();
  let tile = (
    <div
      id={tileID}
      className="w-5 h-5 border-1 opacity-20"
      style={{ borderColor: palette.bgshade4 }}
    ></div>
  );

  if (type == 1) {
    tile = (
      <div
        id={tileID}
        className="w-5 h-5 border-1"
        style={{ borderColor: palette.shade2, backgroundColor: palette.shade2 }}
      ></div>
    );
  } else if (type == 2) {
    tile = (
      <div
        id={tileID}
        className="w-5 h-5 border-1 bg-red-500 border-red-500"
        // style={{ borderColor: palette.shade2, backgroundColor: palette.shade2 }}
      ></div>
    );
  }

  return tile;
}

export default Tile;
