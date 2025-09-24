import { useColor } from "../ColorContext/ColorContext";
function Bubbles({ bubbleArray }) {
  const { palette } = useColor();
  return (
    <div className="flex flex-wrap gap-1 md:gap-2">
      {bubbleArray.map((text, index) => (
        <span
          key={index}
          className="px-3 py-1.5 rounded-full text-xs shadow hover:scale-105 duration-100"
          style={{ color: palette.shade4, backgroundColor: palette.bgshade4 }}
        >
          {text}
        </span>
      ))}
    </div>
  );
}

export default Bubbles;
