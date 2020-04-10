import {SyntheticEvent, useReducer} from 'react';

export const assertNever = (val: never, throwErr = false) => {
  if (throwErr) throw new Error(`Never error: ${val}`);
};

export const stopPropagation = (e: SyntheticEvent) => e.stopPropagation();

export const useForceRender = () => useReducer((s) => s + 1, 0)[1] as () => void;
