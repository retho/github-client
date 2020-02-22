export const assertNever = (val: never, throwErr = false) => {
  if (throwErr) throw new Error(`Never error: ${val}`);
};
