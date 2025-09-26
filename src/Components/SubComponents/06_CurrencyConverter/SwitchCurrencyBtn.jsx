import { useColor } from "../../../context/ColorContext/ColorContext";
import { GoArrowSwitch } from "react-icons/go";

function SwitchCurrencyBtn({ from, to, setFrom, setTo }) {
  const { palette } = useColor();

  const handleSwitch = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <button
      type="button"
      onClick={handleSwitch}
      className="
        size-10 md:size-12 self-center 
        rounded-full -m-3 z-10 
        flex items-center justify-center
        shadow-md hover:shadow-lg
        transition-all duration-200 ease-in-out
        hover:scale-110 active:scale-95
      "
      style={{ backgroundColor: palette.shade3 }}
    >
      <GoArrowSwitch
        className="w-5 h-5 md:w-6 md:h-6"
        style={{ color: palette.shade0 }}
      />
    </button>
  );
}

export default SwitchCurrencyBtn;
