import { useColor } from "./context/ColorContext/ColorContext";

function BgGrid({ className }) {
  const { palette } = useColor();
  return (
    <div
      className={`${className} absolute top-0 left-0 w-full`}
      style={{
        minHeight: "100%",
        backgroundImage: `
      repeating-linear-gradient(
        45deg,
        ${palette.shade2} 0,
        ${palette.shade2} 1px,
        transparent 1px,
        transparent 25px
      ),
      repeating-linear-gradient(
        -45deg,
        ${palette.shade2} 0,
        ${palette.shade2} 1px,
        transparent 1px,
        transparent 25px
      )
    `,
        backgroundSize: "1000rem 1000rem",
        maskImage:
          "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 10%, rgba(0,0,0,1) 15%",
        WebkitMaskImage:
          "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 10%, rgba(0,0,0,1) 15%",
        maskRepeat: "no-repeat",
        maskSize: "100% 100%",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskSize: "100% 100%",
      }}
    />
  );
}

export default BgGrid;
