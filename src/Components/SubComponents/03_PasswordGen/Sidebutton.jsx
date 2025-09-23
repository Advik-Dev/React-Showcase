import { useColor } from "../../ColorContext/ColorContext";

function Sidebutton({ label = "click", etc, onClick }) {
  const { palette } = useColor();
  return (
    <button
      className="w-18 text-center h-10 rounded-r-2xl"
      style={{ color: palette.shade3, backgroundColor: palette.shade1 }}
      onClick={onClick}
      onMouseEnter={(e) =>
        (e.currentTarget.style.backgroundColor = palette.shade0)
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.backgroundColor = palette.shade1)
      }
    >
      {label}
    </button>
  );
}

export default Sidebutton;
