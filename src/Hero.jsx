import ReactLogo from "./assets/reactLogo.png";
import { useColor } from "./Components/ColorContext/ColorContext";
import Reveal from "./Components/Animations/Reveal";

function Hero() {
  const { palette } = useColor();
  return (
    <Reveal>
      <div className="m-4 md:m-10 lg:mx-40 mt-10 lg:mt-20 flex justify-center">
        <div
          className="rounded-3xl hover:shadow-lg transition-shadow duration-500 flex flex-col md:flex-row items-center p-8 md:p-12 space-y-8 md:space-y-0 md:space-x-10 w-full border-2"
          style={{
            background: `linear-gradient(-320deg, ${palette.bgshade2} 50%, ${palette.shade3} 500%)`,
            borderColor: palette.bordershade,
            color: palette.shade4,
          }}
        >
          <div className="flex flex-col gap-4 text-center md:text-left md:w-10/12 transition-all duration-300">
            <h2
              className="text-3xl md:text-4xl font-extrabold drop-shadow-sm transition-transform duration-300"
              style={{ color: palette.shade2 }}
            >
              👋 Hey There!!
            </h2>
            <p className="text-lg md:text-xl leading-relaxed max-w-xl mx-auto md:mx-0">
              Welcome to my React learning journey! I’ve compiled everything
              I’ve built so far — laid out in a clean, chronological order.
            </p>
          </div>

          <img
            src={ReactLogo}
            className="h-50 w-50 animate-spin-slow transition-all duration-500"
          />
        </div>
      </div>
    </Reveal>
  );
}

export default Hero;
