import { useState, useMemo } from "react";
import { generatePalette } from "./GeneratePallete";
import { ColorContext } from "./ColorContext";

export function ColorProvider({ children }) {
  const [primaryColor, setPrimaryColor] = useState("#FF6900");

  // Memoize palette so it updates only when primaryColor changes
  const palette = useMemo(() => generatePalette(primaryColor), [primaryColor]);

  return (
    <ColorContext.Provider value={{ primaryColor, setPrimaryColor, palette }}>
      {children}
    </ColorContext.Provider>
  );
}
