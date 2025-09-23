import { useState, useEffect } from "react";
import Sidebutton from "./Sidebutton";
import { useColor } from "../../ColorContext/ColorContext";

function PasswdBar({ password }) {
  const { palette } = useColor();
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
  };

  useEffect(() => setIsCopied(false), [password]);
  return (
    <>
      <input
        type="text"
        value={password}
        readOnly={true}
        className=" w-[100%] h-10 rounded-l-2xl px-3 focus:outline-none focus:ring-0 focus:border-transparent"
        style={{ backgroundColor: palette.shade4, color: palette.shade0 }}
      />
      {isCopied ? (
        <Sidebutton label="Copied" etc="bg-gray-500" onClick={null} />
      ) : (
        <Sidebutton
          label="Copy"
          etc="bg-blue-500 hover:bg-blue-400 transition transform ease-in-out"
          onClick={copyToClipboard}
        />
      )}
    </>
  );
}

export default PasswdBar;
