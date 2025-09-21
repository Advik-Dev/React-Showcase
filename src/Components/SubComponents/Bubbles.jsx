function Bubbles({ bubbleArray }) {
  return (
    <div className="flex flex-wrap gap-1 md:gap-2">
      {bubbleArray.map((text, index) => (
        <span
          key={index}
          className="px-3 py-1.5 bg-orange-200 text-orange-900 rounded-full text-xs font-semibold shadow hover:scale-105 transition-transform duration-100"
        >
          {text}
        </span>
      ))}
    </div>
  );
}

export default Bubbles;
