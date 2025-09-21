function RangeSlider({ passwordLength, setPasswordLength }) {
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
    ></input>
  );
}

export default RangeSlider;
