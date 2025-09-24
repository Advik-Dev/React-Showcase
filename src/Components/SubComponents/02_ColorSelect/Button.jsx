function Button({ color, text, changeColor, textColor }) {
  return (
    <button
      className="pl-3 pr-3 h-6 w-6 text-center rounded-4xl text-sm
    transition duration-200 ease-in-out transform hover:scale-110 hover:ring-0 active:scale-95 active:transition-none"
      onClick={() => changeColor(color)}
      style={{
        backgroundColor: color,
        color: textColor,
      }}
    >
      {/* {text} Implement Later or Never Tbh */}
    </button>
  );
}
export default Button;
