import { useColor } from "../../ColorContext/ColorContext";

function Sidebutton({ label = "click", etc, onClick }) {
  const { palette } = useColor();
  return (
    <button
      className="w-18 text-center h-10 rounded-r-2xl transition-colors"
      style={{ color: palette.shade0, backgroundColor: palette.shade2 }}
      onClick={onClick}
      onMouseEnter={(e) =>
        (e.currentTarget.style.backgroundColor = palette.shade3)
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.backgroundColor = palette.shade2)
      }
    >
      {label}
    </button>
  );
}

export default Sidebutton;
