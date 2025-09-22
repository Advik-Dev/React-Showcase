import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { useColor } from "./Components/ColorContext/ColorContext";

function Footer() {
  const { palette } = useColor();
  return (
    <div className="relative">
      {/* Spike top */}
      <div
        className="w-full h-[5vh] relative"
        style={{
          backgroundColor: palette.shade3,
        }}
      >
        <div
          className="absolute right-0 left-0 bottom-full z-10 h-[60px]"
          style={{
            backgroundSize: "60px 100%",
            backgroundPosition: "0 0",
            backgroundImage: `linear-gradient(45deg, ${palette.shade3} 25%, transparent 25%), linear-gradient(315deg, ${palette.shade3}  25%, transparent 25%)`,
          }}
        ></div>
      </div>

      <div
        className="flex flex-col md:flex-row justify-around py-5 md:pb-10 p-1 md:p-3"
        style={{
          backgroundColor: palette.shade3,
        }}
      >
        <div className="flex items-center lg:grid lg:grid-cols-3 grid-rows-2 min-w-70 md:min-w-120 mb-3 self-center">
          <div className="flex items-center justify-end px-1 md:px-3 text-xs md:text-lg font-bold">
            A Website By
          </div>
          <div className="font-pacifico text-3xl md:text-4xl lg:text-5xl col-span-2">
            Advik
          </div>
        </div>

        <div className="h-20 flex font-sans italic text-lg justify-center items-center rounded-2xl m-3 p-5">
          ❝ Reinventing the wheel
          <br /> to learn the process of invention. ❞
        </div>
        <div
          className="h-20 rounded-2xl m-3 p-5 px-3 flex flex-row justify-center items-center gap-3"
          style={{ backgroundColor: palette.shade2 }}
        >
          <a href="https://github.com/Advik-Dev" target="_blank">
            <FaGithub
              className="h-12 w-auto rounded-xl p-1 hover:ring-4 transition ease-in-out"
              style={{ backgroundColor: palette.shade3 }}
            />
          </a>
          <a href="https://x.com/AdvikDev" target="_blank">
            <FaTwitter
              className="h-12 w-auto rounded-xl p-1 hover:ring-4 transition ease-in-out"
              style={{ backgroundColor: palette.shade3 }}
            />
          </a>
          <a href="mailto:AdvikDev@proton.me">
            <IoMdMail
              className="h-12 w-auto rounded-xl p-1 hover:ring-4 transition ease-in-out"
              style={{ backgroundColor: palette.shade3 }}
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
