import {SyntheticEvent, useReducer} from 'react';

export const assertNever = (val: never, throwErr = false) => {
  if (throwErr) throw new Error(`Never error: ${val}`);
};

export const stopPropagation = (e: SyntheticEvent) => e.stopPropagation();

export const useForceRender = () => useReducer((s) => s + 1, 0)[1] as () => void;

// * https://spin.atomicobject.com/2018/01/15/typescript-flexible-nominal-typing/
const brand = Symbol('brand');
const flavor = Symbol('flavor');
export type Brand<T, U> = T & {[brand]: U};
export type Flavor<T, U> = T & {[flavor]?: U};
