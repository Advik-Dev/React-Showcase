import { useColor } from "../../../context/ColorContext/ColorContext";

function Button({ onClick, text }) {
  const { palette } = useColor();

  return (
    <button
      className="p-3 text-xl md:text-2xl text-center w-30 rounded-2xl
                 transform transition-all duration-300 ease-in-out
                 active:scale-95 focus:outline-none hover:ring-2 active:transition-none"
      onClick={onClick}
      style={{
        backgroundColor: palette.bgshade3,
        color: palette.shade2,
        "--tw-ring-color": palette.shade2,
      }}
    >
      {text}
    </button>
  );
}

export default Button;
