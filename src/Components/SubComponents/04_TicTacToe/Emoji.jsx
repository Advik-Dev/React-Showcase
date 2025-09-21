import { faceEmojis } from "./otherData";

function Emoji({ emoji, setEmoji }) {
  return (
    <button
      className="text-7xl md:text-8xl active:scale-90 ease-in-out transition active:transition-none"
      onClick={() =>
        setEmoji(faceEmojis[Math.floor(Math.random() * faceEmojis.length)])
      }
    >
      {emoji}
    </button>
  );
}

export default Emoji;
