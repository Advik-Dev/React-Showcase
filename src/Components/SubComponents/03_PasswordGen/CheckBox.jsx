function CheckBox({ label, checked, onChange }) {
  return (
    <label className="flex self-center text-blue-300">
      <input
        type="checkbox"
        name={label}
        checked={checked}
        onChange={onChange}
        className="mr-2"
      />
      {label}
    </label>
  );
}
export default CheckBox;
