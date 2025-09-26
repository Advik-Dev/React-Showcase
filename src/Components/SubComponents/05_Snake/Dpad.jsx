import React from "react";
import { useColor } from "../../../context/ColorContext/ColorContext";

function Dpad({ setDirection }) {
  const { palette } = useColor();
  return (
    <div className="grid grid-cols-3 grid-rows-3 w-36 h-36 mx-auto mr-1 items-center justify-items-center">
      {/* Row 1 */}
      <div></div>
      <button
        className="w-full h-full rounded-t-sm flex items-center justify-center text-xl transition duration-200 ease-in-out transform active:scale-95 active:transition-none font-bold
        [clip-path:polygon(0.5rem_0,calc(100%-0rem)_0,100%_0.5rem,100%_calc(100%-0.5rem),calc(100%-0.5rem)_100%,0.5rem_100%,0_calc(100%-0.5rem),0_0rem)]"
        style={{ backgroundColor: palette.shade2 }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = palette.shade1)
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = palette.shade2)
        }
        onClick={() => setDirection("north")}
      ></button>
      <div></div>

      {/* Row 2 */}
      <button
        className="w-full h-full rounded-l-sm flex items-center justify-center text-xl transition duration-200 ease-in-out transform active:scale-95 active:transition-none font-bold
        [clip-path:polygon(0.5rem_0,calc(100%-0.5rem)_0,100%_0.5rem,100%_calc(100%-0.5rem),calc(100%-0.5rem)_100%,0rem_100%,0_calc(100%-0.5rem),0_0rem)]"
        style={{ backgroundColor: palette.shade2 }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = palette.shade1)
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = palette.shade2)
        }
        onClick={() => setDirection("west")}
      ></button>
      {/* <div className="w-full h-full  rounded-2xl bg-green-400 flex items-center justify-center text-xl cursor-default"></div> */}
      <div className="w-0 h-0 [clip-path:polygon(0.5rem_0,calc(100%-0.5rem)_0,100%_0.5rem,100%_calc(100%-0.5rem),calc(100%-0.5rem)_100%,0.5rem_100%,0_calc(100%-0.5rem),0_0.5rem)] bg-green-400 flex items-center justify-center text-xl cursor-default"></div>
      <button
        className="w-full h-full rounded-r-sm flex items-center justify-center text-xl transition duration-200 ease-in-out transform active:scale-95 active:transition-none font-bold
                [clip-path:polygon(0.5rem_0,calc(100%-0rem)_0,100%_0.5rem,100%_calc(100%-0rem),calc(100%-0.5rem)_100%,0.5rem_100%,0_calc(100%-0.5rem),0_0.5rem)]"
        style={{ backgroundColor: palette.shade2 }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = palette.shade1)
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = palette.shade2)
        }
        onClick={() => setDirection("east")}
      ></button>

      {/* Row 3 */}
      <div></div>
      <button
        className="w-full h-full rounded-b-sm flex items-center justify-center text-xl transition duration-200 ease-in-out transform active:scale-95 active:transition-none font-bold
        [clip-path:polygon(0.5rem_0,calc(100%-0.5rem)_0,100%_0.5rem,100%_calc(100%-0rem),calc(100%-0.5rem)_100%,0rem_100%,0_calc(100%-0.5rem),0_0.5rem)]"
        style={{ backgroundColor: palette.shade2 }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = palette.shade1)
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = palette.shade2)
        }
        onClick={() => setDirection("south")}
      ></button>
      <div></div>
    </div>
  );
}

export default Dpad;
