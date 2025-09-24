import Button from "./Button";
import { colorMap } from "./colors.js";
import { useColor } from "../../ColorContext/ColorContext.jsx";

function ColorSelector() {
  const { _primaryColor, setPrimaryColor, palette } = useColor();

  // const [position, setPosition] = useState({ x: 0, y: 0 }); Implement Later Mouse Hover info

  function getRandomBgColor() {
    const randomHex = Math.floor(Math.random() * 0xffffff).toString(16);
    setPrimaryColor(`#${randomHex.padStart(6, "0")}`);
  }

  const changeColor = (color) => {
    setPrimaryColor(color);
  };

  return (
    <div
      className="flex flex-col justify-center transition-colors rounded-2xl h-auto items-center space-y-5 border-2"
      style={{
        backgroundColor: palette.bgshade1,
        color: palette.shade0,
        borderColor: palette.bordershade,
      }}
    >
      <div
        className="w-10/11 rounded-2xl shadow p-5 m-5"
        style={{ backgroundColor: palette.bgshade3 }}
      >
        <div className="flex flex-row gap-4 items-start">
          <div
            className="w-24 h-24 rounded-lg"
            style={{
              backgroundColor: palette.shade2,
            }}
          ></div>

          <div className="flex-1 flex flex-col gap-3">
            <div
              className="h-8 rounded-md"
              style={{
                backgroundColor: palette.shade3,
              }}
            ></div>
            <div
              className="h-4 rounded-full w-full"
              style={{
                backgroundColor: palette.shade2,
              }}
            ></div>
            <div
              className="h-4 rounded-full w-5/6"
              style={{
                backgroundColor: palette.shade2,
              }}
            ></div>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <div
            className="h-4 rounded-full w-full"
            style={{
              backgroundColor: palette.shade1,
            }}
          ></div>
          <div
            className="h-4 rounded-full w-2/3"
            style={{
              backgroundColor: palette.shade1,
            }}
          ></div>
        </div>
      </div>

      <div
        className="rounded-2xl flex flex-wrap justify-center items-center gap-3 p-3 sm:m-5 sm:mt-0"
        style={{ backgroundColor: palette.bgshade3 }}
      >
        {Object.entries(colorMap).map(([name, { bg, text }]) => (
          <Button
            color={bg}
            text={name}
            changeColor={changeColor}
            textColor={text}
            key={name}
          />
        ))}

        <button
          className={`bg-black pl-3 pr-3 h-8 text-center rounded-4xl text-sm
    transition duration-200 ease-in-out transform hover:ring-2 hover:ring-black active:scale-95 active:transition-none`}
          onClick={getRandomBgColor}
        >
          🎲
        </button>
      </div>
    </div>
  );
}

export default ColorSelector;
