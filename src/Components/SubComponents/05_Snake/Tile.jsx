import React from "react";

function Tile({ tileID, type }) {
  let tile = (
    <div
      id={tileID}
      className="w-5 h-5 border-1 border-gray-600 opacity-20"
    ></div>
  );

  if (type == 1) {
    tile = (
      <div
        id={tileID}
        className="w-5 h-5 border-1 border-green-400 bg-green-400"
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
