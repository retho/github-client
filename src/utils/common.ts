import { SyntheticEvent } from 'react';

export const assertNever = (val: never, throwErr = false) => {
  if (throwErr) throw new Error(`Never error: ${val}`);
};

export const stopPropagation = (e: SyntheticEvent) => e.stopPropagation();
