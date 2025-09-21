function Button({ onClick, text }) {
  return (
    <button
      className="p-3 text-xl md:text-2xl text-center text-white w-30 bg-gray-800 rounded-2xl
             transform transition-all duration-300 ease-in-out
             active:scale-95 active:bg-gray-700
             focus:outline-none hover:ring-4 hover:ring-gray-500/50 active:transition-none"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
