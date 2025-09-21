import { createContext, useContext } from "react";

export const ColorContext = createContext();

// Custom hook
export function useColor() {
  return useContext(ColorContext);
}
