/* eslint-disable no-unused-vars */
import Bubbles from "./SubComponents/Bubbles";

function Card({
  title,
  description,
  component: Component,
  bubbles,
  smallDescription = null,
}) {
  let customInsert = null;
  if (title == "Color Selector") {
    customInsert = <span className="opacity-10">ground</span>;
  }
  return (
    <div className="m-3 md:m-10 lg:mx-40 flex flex-col md:flex-row items-center bg-orange-300 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 space-y-6 md:space-y-0 md:space-x-10 relative">
      <div className="text-center md:text-left flex-1 p-3 rounded-2xl">
        <h2 className="w-max text-2xl md:text-3xl font-bold mb-3 bg-orange-100 rounded-xl p-3 mx-auto md:mx-0 text-center md:text-left">
          <span className="font-bold text-orange-400">//: </span>
          {title}
        </h2>

        <p className="text-base md:text-lg leading-relaxed">
          {description}
          {customInsert}
        </p>
        {smallDescription && (
          <p className="text-xs text-orange-300 absolute bottom-10">
            {smallDescription}
          </p>
        )}
        <p className="text-sm mt-2 mb-1 ml-1 text-orange-800">
          Stuff I learned while making this -
        </p>
        <Bubbles bubbleArray={bubbles} />
      </div>
      <div className="flex-1 flex justify-center">
        <Component />
      </div>
    </div>
  );
}

export default Card;
