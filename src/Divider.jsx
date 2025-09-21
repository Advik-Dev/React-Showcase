import React from "react";

function Divider({ text }) {
  return (
    <div className="relative w-full text-center mb-10 md:text-start md:my-12 flex flex-col text-orange-200 text-shadow-lg">
      <h2 className="font-pacifico text-5xl md:text-6xl md:mx-30 z-10 relative">
        {text}
      </h2>
      <hr className="border-2" />
    </div>
  );
}

export default Divider;
