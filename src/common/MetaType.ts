import { NonNullableAt } from "./typings";

export declare const TMetaType: unique symbol;

export type WithMetaType<T> = { [TMetaType]?: T };

export type MetaType<T extends { [TMetaType]? }> = NonNullableAt<
  T,
  typeof TMetaType
>;

export type MetaTypeHook<
  T extends AnyT,
  AnyT extends WithMetaType<any>,
  U
> = WithMetaType<Omit<MetaType<T>, keyof MetaType<AnyT> | keyof U> & U>;

export function testMetaType<T>(
  obj: WithMetaType<T>,
  callback: (type: T) => void
) {
  //
}
