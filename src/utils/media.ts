import { useContext, useMemo, useEffect } from 'react';
import { MediaContext } from 'components/atoms/MediaProvider';

export enum MediaBreakpoints {
  lg = 1350,
  md = 1072,
  sm = 768,
  xs = 520,
}

export const useMedia = <V>(defaultValue: V, config: Record<number, V>): V => {
  const {
    windowWidth,
    registerBreakpoints,
    unregisterBreakpoints,
  } = useContext(MediaContext);

  const breakpoints = useMemo(
    () =>
      Object.keys(config)
        .map((x) => +x)
        .sort((a, b) => a - b),
    []
  );

  useEffect(() => {
    registerBreakpoints(breakpoints);
    return () => unregisterBreakpoints(breakpoints);
  }, []);

  const currentBreakpoint = useMemo(
    () => breakpoints.find((x) => windowWidth < x),
    [windowWidth]
  );

  return currentBreakpoint ? config[currentBreakpoint] : defaultValue;
};
