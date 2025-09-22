import { useColor } from "../../ColorContext/ColorContext";
function CrackTime({ passwordLength, checkedItems }) {
  const { palette } = useColor();
  function formatTime(seconds) {
    if (seconds < 1) return "< 1 second";

    const units = [
      { label: "year", secs: 31536000 },
      { label: "day", secs: 86400 },
      { label: "hour", secs: 3600 },
      { label: "minute", secs: 60 },
      { label: "second", secs: 1 },
    ];

    let result = [];
    for (const { label, secs } of units) {
      const val = Math.floor(seconds / secs);
      if (val > 0) {
        result.push(`${val} ${label}${val > 1 ? "s" : ""}`);
        seconds %= secs;
      }
    }
    return result.join(", ");
  }

  function calculateCrackTime(passwordLength, options) {
    let charsetSize = 26; // default lowercase

    if (options.Numbers) charsetSize += 10;
    if (options.Characters) charsetSize += 32; // Rough number of printable special characters

    const totalCombinations = Math.pow(charsetSize, passwordLength);

    const guessesPerSecond = 1e8; // average offline attacker with a mid-range GPU
    const averageGuesses = totalCombinations / 2;
    const averageTimeSeconds = averageGuesses / guessesPerSecond;

    return formatTime(averageTimeSeconds);
  }

  return (
    <div className="w-full sm:h-15 p-2 sm:mb-3">
      <div
        style={{
          color: palette.shade2,
        }}
      >
        Average time required to break the password: <br />
        <span
          className="font-bold"
          style={{
            color: palette.shade4,
          }}
        >
          {calculateCrackTime(passwordLength, checkedItems)}
        </span>
      </div>
    </div>
  );
}

export default CrackTime;
