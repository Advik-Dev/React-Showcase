import HeaderSvg from "./HeaderSvg";
import { useColor } from "./Components/ColorContext/ColorContext";

function Header({ className }) {
  const { palette } = useColor();
  return (
    <div className={`${className} relative`}>
      <HeaderSvg />
      <h1
        className="font-pacifico text-4xl sm:text-5xl md:text-7xl p-4 text-center w-full text-shadow-lg"
        style={{ color: palette.shade2 }}
      >
        My React.js Projects
      </h1>
    </div>
  );
}

export default Header;
