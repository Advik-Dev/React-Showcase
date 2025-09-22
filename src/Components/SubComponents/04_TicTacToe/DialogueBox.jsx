import { useState, useEffect } from "react";
import { useColor } from "../../ColorContext/ColorContext";

function DialogueBox({ text }) {
  const { palette } = useColor();
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let isCancelled = false;

    async function typeText() {
      setDisplayedText(""); // reset
      for (let i = 0; i < text.length; i++) {
        if (isCancelled) return;
        setDisplayedText((prev) => prev + text[i]);
        await new Promise((r) => setTimeout(r, 30));
      }
    }

    typeText();

    return () => {
      isCancelled = true;
    };
  }, [text]);

  return (
    <div
      className="w-11/12 max-w-3xl rounded-xl px-6 shadow-xl text-center text-xl font-semibold justify-center border-2"
      style={{
        backgroundColor: palette.shade3,
        color: palette.shade0,
        borderColor: palette.shade0,
      }}
    >
      {displayedText}
    </div>
  );
}

export default DialogueBox;
