import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { pickBy, identity } from 'lodash-es';

interface IMediaContextValue {
  windowWidth: number;
  registerBreakpoints: (breakpoints: number[]) => void;
  unregisterBreakpoints: (breakpoints: number[]) => void;
}
export const MediaContext = React.createContext<IMediaContextValue>({
  windowWidth: window.innerWidth,
  registerBreakpoints: () => null,
  unregisterBreakpoints: () => null,
});

export interface IThemeProviderProps {
  children: JSX.Element;
}
const MediaProvider = ({ children }: IThemeProviderProps) => {
  const [usedBreakpoints, setUsedBreakpoints] = useState<
    Record<number, number>
  >({});
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const listener = () => setWindowWidth(window.innerWidth);

    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, []);

  const registerBreakpoints = useCallback(
    (bps: number[]) =>
      setUsedBreakpoints((ub) =>
        bps.reduce(
          (acc, x) => ({
            ...acc,
            [x]: acc[x] ? acc[x] + 1 : 1,
          }),
          ub
        )
      ),
    []
  );
  const unregisterBreakpoints = useCallback(
    (bps: number[]) =>
      setUsedBreakpoints((ub) =>
        pickBy(
          bps.reduce(
            (acc, x) => ({
              ...acc,
              [x]: acc[x] - 1,
            }),
            ub
          ),
          identity
        )
      ),
    []
  );

  const breakpoints = useMemo(
    () =>
      Object.keys(usedBreakpoints)
        .map((x) => +x)
        .sort((a, b) => a - b),
    [usedBreakpoints]
  );
  const currentBreakpoint = useMemo(
    () => breakpoints.find((x) => windowWidth < x),
    [breakpoints, windowWidth]
  );
  const value = useMemo(
    () => ({
      windowWidth,
      registerBreakpoints,
      unregisterBreakpoints,
    }),
    [currentBreakpoint]
  );

  return (
    <MediaContext.Provider value={value}>{children}</MediaContext.Provider>
  );
};

export default MediaProvider;
