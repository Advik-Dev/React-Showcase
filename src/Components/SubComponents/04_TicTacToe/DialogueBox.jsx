import { useState, useEffect } from "react";

function DialogueBox({ text }) {
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
    <div className="w-11/12 max-w-3xl bg-white bg-opacity-90 border-2 border-gray-300 rounded-xl px-6 shadow-xl text-center text-xl text-gray-800 font-semibold justify-center">
      {displayedText}
    </div>
  );
}

export default DialogueBox;
