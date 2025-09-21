import Button from "./Button";
import { colorMap } from "./colors.js";
import { useColor } from "../../ColorContext/ColorContext.jsx";

function ColorSelector() {
  const { _primaryColor, setPrimaryColor, palette } = useColor();
  console.log(palette);

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
      className="lg:min-w-140 md:min-w-100 flex flex-col justify-center transition-colors rounded-2xl h-auto items-center space-y-5"
      style={{
        backgroundColor: palette.shade1,
        color: palette.text,
      }}
    >
      <div
        className="w-10/11 sm:w-96 rounded-2xl shadow p-5 m-5"
        style={{ backgroundColor: palette.shade2, color: palette.text }}
      >
        <div className="flex flex-row gap-4 items-start">
          <div
            className="w-24 h-24 rounded-lg"
            style={{
              backgroundColor: palette.shade4,
              color: palette.text,
            }}
          ></div>

          <div className="flex-1 flex flex-col gap-3">
            <div
              className="h-8 rounded-md"
              style={{
                backgroundColor: palette.shade4,
                color: palette.text,
              }}
            ></div>
            <div
              className="h-4 rounded-full bg-gray-200 w-full"
              style={{
                backgroundColor: palette.shade3,
                color: palette.text,
              }}
            ></div>
            <div
              className="h-4 rounded-full bg-gray-200 w-5/6"
              style={{
                backgroundColor: palette.shade3,
                color: palette.text,
              }}
            ></div>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <div
            className="h-4 rounded-full bg-gray-200 w-full"
            style={{
              backgroundColor: palette.shade3,
              color: palette.text,
            }}
          ></div>
          <div
            className="h-4 rounded-full bg-gray-200 w-2/3"
            style={{
              backgroundColor: palette.shade3,
              color: palette.text,
            }}
          ></div>
        </div>
      </div>

      <div className="bg-amber-50 rounded-2xl flex flex-wrap justify-center items-center gap-3 p-3 sm:m-5 sm:mt-0">
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
