// typings/object/ typings.Require
export type RequireOptionalKeys<T> = {
  // make optional props to type or undefined
  [K in keyof Required<T>]: T[K];
};
