import { useColor } from "../context/ColorContext/ColorContext";
import Bubbles from "./SubComponents/Bubbles";
import Reveal from "./Animations/Reveal";

function Card({
  title,
  description,
  component: Component,
  bubbles,
  smallDescription = null,
}) {
  const { palette } = useColor();
  let customInsert = null;

  // F.Y.I, I know this is a bad implementation and I don't care /
  if (title == "Color Selector") {
    customInsert = <span className="opacity-15">ground</span>;
  } else if (title == "Currency Converter") {
    customInsert = <span className="opacity-15">in Venezuelan bolívar</span>;
  }
  // console.log(palette);

  return (
    <Reveal className="flex justify-center w-full">
      <div
        className="m-3 w-11/12 md:w-9/11 flex flex-col lg:flex-row items-center rounded-2xl shadow-md hover:shadow-lg duration-300 p-6 space-y-6 md:space-y-0 md:space-x-10 relative border-2"
        style={{
          background: `linear-gradient(-350deg, ${palette.bgshade1}, ${palette.bgshade3})`,
          borderColor: palette.bordershade,
        }}
      >
        <div className="text-center md:text-left flex-1 p-3 rounded-2xl">
          <h2
            className="w-max text-2xl md:text-3xl font-bold mb-3 rounded-xl p-3 mx-auto md:mx-0 text-center md:text-left"
            style={{ backgroundColor: palette.bgshade4, color: palette.shade4 }}
          >
            <span className="font-bold" style={{ color: palette.shade2 }}>
              //:{" "}
            </span>
            {title}
          </h2>

          <p
            className="text-base md:text-lg leading-relaxed"
            style={{ color: palette.shade4 }}
          >
            {description}
            {customInsert}
          </p>
          {smallDescription && (
            <p
              className="text-xs absolute bottom-10"
              style={{ color: palette.shade2 }}
            >
              {smallDescription}
            </p>
          )}
          <p
            className="text-sm mt-2 mb-1 ml-1 "
            style={{ color: palette.shade2 }}
          >
            Stuff I learned while making this -
          </p>
          <Bubbles bubbleArray={bubbles} />
        </div>
        <div className="flex-1 flex justify-center">
          <Component />
        </div>
      </div>
    </Reveal>
  );
}

export default Card;
