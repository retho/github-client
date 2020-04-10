import {useMemo, useEffect, useRef} from 'react';
import {useForceRender} from './common';

const getCurrentBreakpoint = (breakpointsSortedByAsc: number[], windowWidth: number) =>
  breakpointsSortedByAsc.find((x) => windowWidth < x);

export const useMedia = <V>(defaultValue: V, config: Record<number, V>): V => {
  const forceRender = useForceRender();

  const breakpoints = useMemo(
    () =>
      Object.keys(config)
        .map((x) => +x)
        .sort((a, b) => a - b),
    []
  );
  const currentBreakpointRef = useRef(getCurrentBreakpoint(breakpoints, window.innerWidth));

  useEffect(() => {
    const listener = () => {
      const prevBreakpoint = currentBreakpointRef.current;
      currentBreakpointRef.current = getCurrentBreakpoint(breakpoints, window.innerWidth);
      if (currentBreakpointRef.current !== prevBreakpoint) forceRender();
    };

    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, []);

  return currentBreakpointRef.current ? config[currentBreakpointRef.current] : defaultValue;
};

export enum MediaBreakpoints {
  lg = 1350,
  md = 1072,
  sm = 768,
  xs = 520,
}
