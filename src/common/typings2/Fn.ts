export type Fn = (...args: any[]) => any;

export type OmitParameter<T extends Fn> = Parameters<T> extends [
  any,
  ...infer U
]
  ? U
  : never;
