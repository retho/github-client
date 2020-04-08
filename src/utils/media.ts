import { useContext, useMemo } from 'react';
import { MediaContext } from 'components/atoms/MediaProvider';

export enum MediaBreakpoints {
  lg = 1350,
  md = 1072,
  sm = 768,
  xs = 520,
}

export const useMedia = <V>(defaultValue: V, config: Record<number, V>): V => {
  const windowWidth = useContext(MediaContext);
  const breakpoints = useMemo(
    () =>
      Object.keys(config)
        .map((x) => +x)
        .sort((a, b) => a - b),
    [config]
  );
  const currentBreakpoint = useMemo(
    () => breakpoints.find((x) => windowWidth < x),
    [breakpoints, windowWidth]
  );
  return currentBreakpoint ? config[currentBreakpoint] : defaultValue;
};
