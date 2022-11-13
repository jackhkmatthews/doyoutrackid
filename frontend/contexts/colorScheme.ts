import { createContext, Dispatch, SetStateAction } from "react";

import { COLOR_SCHEME } from "../hooks/useColorScheme";

export interface IColorScheme {
  colorScheme: COLOR_SCHEME;
  setColorScheme: Dispatch<SetStateAction<COLOR_SCHEME>>;
}

export const ColorScheme = createContext<IColorScheme>({
  colorScheme: COLOR_SCHEME.light,
  setColorScheme: () => null,
});
