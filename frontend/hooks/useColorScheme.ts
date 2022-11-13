import { Dispatch, SetStateAction, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

import {
  PREFERRED_COLOR_SCHEME,
  usePrefersColorScheme,
} from "./usePrefersColorScheme";

export enum COLOR_SCHEME {
  light = "light",
  dark = "dark",
}

export const COLOR_SCHEME_KEY = "color-scheme";

export function useColorScheme() {
  const [preferredColorScheme] = usePrefersColorScheme();
  const [localStorageColorScheme, setLocalStorageColorScheme] =
    useLocalStorage<COLOR_SCHEME>(
      COLOR_SCHEME_KEY,
      preferredColorScheme === PREFERRED_COLOR_SCHEME.dark
        ? COLOR_SCHEME.dark
        : COLOR_SCHEME.light
    );

  // Match system preferences if they change
  useEffect(() => {
    const newColorScheme =
      preferredColorScheme === PREFERRED_COLOR_SCHEME.dark
        ? COLOR_SCHEME.dark
        : COLOR_SCHEME.light;
    setLocalStorageColorScheme(newColorScheme);
  }, [preferredColorScheme, setLocalStorageColorScheme]);

  return [localStorageColorScheme, setLocalStorageColorScheme] as [
    COLOR_SCHEME,
    Dispatch<SetStateAction<COLOR_SCHEME>>
  ];
}
