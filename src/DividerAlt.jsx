function DividerAlt({ text, subtext }) {
  return (
    <div className="relative w-full text-center mb-10 md:my-12 flex flex-col text-orange-200 text-shadow-lg">
      <hr className="border-2 m-2" />
      <h2 className="m-2 font-pacifico text-4xl md:text-6xl md:mx-30 z-10 relative">
        {text}
      </h2>
      <p className="m-2 text-sm md:text-lg md:mx-30 z-10 relative">{subtext}</p>
    </div>
  );
}

export default DividerAlt;
