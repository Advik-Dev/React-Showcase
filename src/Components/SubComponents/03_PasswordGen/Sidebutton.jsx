import { useColor } from "../../ColorContext/ColorContext";

function Sidebutton({ label = "click", etc, onClick }) {
  const { palette } = useColor();
  return (
    <button
      className="w-18 text-center h-10 rounded-r-2xl"
      style={{ color: palette.shade0, backgroundColor: palette.shade3 }}
      onClick={onClick}
      onMouseEnter={(e) =>
        (e.currentTarget.style.backgroundColor = palette.shade2)
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.backgroundColor = palette.shade3)
      }
    >
      {label}
    </button>
  );
}

export default Sidebutton;
