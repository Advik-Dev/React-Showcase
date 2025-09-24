import { useColor } from "../../ColorContext/ColorContext";
function CheckBox({ label, checked, onChange }) {
  const { palette } = useColor();
  return (
    <label className="flex self-center">
      <input
        type="checkbox"
        name={label}
        checked={checked}
        onChange={onChange}
        className="mr-2"
        style={{ accentColor: palette.shade2, borderColor: palette.shade0 }}
      />
      {label}
    </label>
  );
}
export default CheckBox;
