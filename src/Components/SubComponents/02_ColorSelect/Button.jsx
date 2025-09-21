function Button({ color, text, changeColor, textColor }) {
  return (
    <button
      className="pl-3 pr-3 h-8 text-center rounded-4xl text-sm
    transition duration-200 ease-in-out transform hover:ring-2 hover:ring-black active:scale-95 active:transition-none"
      onClick={() => changeColor(color)}
      style={{
        backgroundColor: color,
        color: textColor,
      }}
    >
      {text}
    </button>
  );
}
export default Button;
