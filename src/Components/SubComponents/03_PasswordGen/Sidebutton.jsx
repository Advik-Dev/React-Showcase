function Sidebutton({ label = "click", etc, onClick }) {
  return (
    <button
      className={`w-18 text-center h-10 rounded-r-2xl text-white ${etc}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default Sidebutton;
