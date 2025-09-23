import { useColor } from "../../ColorContext/ColorContext";
function RangeSlider({ passwordLength, setPasswordLength }) {
  const { palette } = useColor();
  const handleSliderChange = (e) => {
    setPasswordLength(e.target.value);
  };
  return (
    <input
      type="range"
      id="volume"
      name="volume"
      min="0"
      max="30"
      value={passwordLength}
      onChange={handleSliderChange}
      style={{ accentColor: palette.shade1 }}
    ></input>
  );
}

export default RangeSlider;
