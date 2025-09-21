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

// Decide black or white text for readability
function getContrastText(hex) {
  const { r, g, b } = hexToRgb(hex);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? "#000000" : "#FFFFFF";
}

// Main function
export function generatePalette(primaryColor) {
  const { r, g, b } = hexToRgb(primaryColor);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  let shade1, shade2, shade3, shade4;

  if (luminance >= 0.85) {
    // Very light → only darker
    shade1 = adjustColor(primaryColor, -40);
    shade2 = adjustColor(primaryColor, -60);
    shade3 = adjustColor(primaryColor, -80);
    shade4 = adjustColor(primaryColor, -100);
  } else if (luminance <= 0.15) {
    // Very dark → only lighter
    shade1 = adjustColor(primaryColor, 40);
    shade2 = adjustColor(primaryColor, 60);
    shade3 = adjustColor(primaryColor, 80);
    shade4 = adjustColor(primaryColor, 100);
  } else {
    // Mid-tone → mix
    shade1 = adjustColor(primaryColor, -50);
    shade2 = adjustColor(primaryColor, 40);
    shade3 = adjustColor(primaryColor, 60);
    shade4 = adjustColor(primaryColor, 80);
  }

  return {
    primary: primaryColor,
    shade1,
    shade2,
    shade3,
    shade4,
    text: getContrastText(primaryColor),
  };
}
