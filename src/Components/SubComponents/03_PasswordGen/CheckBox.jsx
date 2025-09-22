import { useColor } from "../../ColorContext/ColorContext";
function CheckBox({ label, checked, onChange }) {
  const { palette } = useColor();
  return (
    <label className="flex self-center" style={{ color: palette.shade3 }}>
      <input
        type="checkbox"
        name={label}
        checked={checked}
        onChange={onChange}
        className="mr-2"
        style={{ accentColor: palette.shade3, borderColor: palette.shade1 }}
      />
      {label}
    </label>
  );
}
export default CheckBox;
