import { Dispatch, SetStateAction, useEffect, useState } from "react";

export enum PREFERRED_COLOR_SCHEME {
  light = "light",
  dark = "dark",
  noPreference = "no-preference",
}

const query = (mode: PREFERRED_COLOR_SCHEME) =>
  `(prefers-color-scheme: ${mode})`;

function getDarkQuery() {
  return window.matchMedia?.(query(PREFERRED_COLOR_SCHEME.dark));
}
function getLightQuery() {
  return window.matchMedia?.(query(PREFERRED_COLOR_SCHEME.light));
}

export function usePrefersColorScheme() {
  const [preferredColorSchema, setPreferredColorSchema] =
    useState<PREFERRED_COLOR_SCHEME>(PREFERRED_COLOR_SCHEME.noPreference);

  // Initial getting of preferred color scheme
  useEffect(() => {
    const isDark = getDarkQuery()?.matches;
    const isLight = getLightQuery()?.matches;
    if (isDark) setPreferredColorSchema(PREFERRED_COLOR_SCHEME.dark);
    else if (isLight) setPreferredColorSchema(PREFERRED_COLOR_SCHEME.light);
    else setPreferredColorSchema(PREFERRED_COLOR_SCHEME.noPreference);
  }, []);

  // Listening for changes to preferred color scheme
  useEffect(() => {
    const darkQuery = getDarkQuery();
    const lightQuery = getLightQuery();
    if (typeof darkQuery.addEventListener === "function") {
      const darkListener = ({ matches }: MediaQueryListEvent) =>
        matches && setPreferredColorSchema(PREFERRED_COLOR_SCHEME.dark);
      const lightListener = ({ matches }: MediaQueryListEvent) =>
        matches && setPreferredColorSchema(PREFERRED_COLOR_SCHEME.light);

      darkQuery.addEventListener("change", darkListener);
      lightQuery.addEventListener("change", lightListener);

      return () => {
        darkQuery.removeEventListener("change", darkListener);
        lightQuery.removeEventListener("change", lightListener);
      };
    } else {
      // In some early implementations MediaQueryList existed, but did not
      // subclass EventTarget

      // Closing over isDark here would cause it to not update when
      // `darkQuery.matches` changes
      const listener = () =>
        setPreferredColorSchema(
          darkQuery.matches
            ? PREFERRED_COLOR_SCHEME.dark
            : lightQuery.matches
            ? PREFERRED_COLOR_SCHEME.light
            : PREFERRED_COLOR_SCHEME.noPreference
        );

      // This is two state updates if a user changes from dark to light, but
      // both state updates will be consistent and should be batched by React,
      // resulting in only one re-render
      darkQuery.addListener(listener);
      lightQuery.addListener(listener);

      return () => {
        darkQuery.removeListener(listener);
        lightQuery.removeListener(listener);
      };
    }
  }, []);

  return [preferredColorSchema, setPreferredColorSchema] as [
    PREFERRED_COLOR_SCHEME,
    Dispatch<SetStateAction<PREFERRED_COLOR_SCHEME>>
  ];
}
