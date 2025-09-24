// Helper: convert hex to RGB
function hexToRgb(hex) {
  hex = hex.replace("#", "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const num = parseInt(hex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

// Helper: convert RGB to hex
function rgbToHex(r, g, b) {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

// Adjust brightness by a percentage (-100 to +100)
function adjustColor(hex, percent) {
  const { r, g, b } = hexToRgb(hex);

  function adjustChannel(c) {
    if (percent >= 0) {
      // lighten: move towards 255
      return Math.round(c + (255 - c) * (percent / 100));
    } else {
      // darken: move towards 0
      return Math.round(c * (1 + percent / 100));
    }
  }

  return rgbToHex(
    Math.min(255, Math.max(0, adjustChannel(r))),
    Math.min(255, Math.max(0, adjustChannel(g))),
    Math.min(255, Math.max(0, adjustChannel(b)))
  );
}

// Main function
export function generatePalette(primaryColor, theme = "dark") {
  const { r, g, b } = hexToRgb(primaryColor);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  let shade1, shade2, shade3, shade4, shade0;
  shade0 = adjustColor(primaryColor, -90); // strong darkening

  shade1 = adjustColor(primaryColor, -50);
  shade2 = adjustColor(primaryColor, 30);
  shade3 = adjustColor(primaryColor, 60);
  shade4 = adjustColor(primaryColor, 90);
  // shade4 = "#FFFFFF";

  // Background shades (theme-based)
  let bgBase = theme === "dark" ? "#000000" : "#FFFFFF";
  let text = theme === "dark" ? "#FFFFFF" : "#000000";
  let bgshade0 = theme === "dark" ? "#0A0A0A" : 0;
  let bgshade1 = theme === "dark" ? "#171717" : 0;
  let bgshade2 = theme === "dark" ? "#202020" : 0;
  let bgshade3 = theme === "dark" ? "#282828" : 0;
  let bgshade4 = theme === "dark" ? "#383838" : 0;
  let bordershade = theme === "dark" ? "#3C3C3C" : 0;

  return {
    primary: primaryColor,
    shade0,
    shade1,
    shade2,
    shade3,
    shade4,
    bgshade0,
    bgshade1,
    bgshade2,
    bgshade3,
    bgshade4,
    bordershade,
    text,
    bgBase,
  };
}
