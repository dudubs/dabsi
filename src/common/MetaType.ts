import { NonNullableAt } from "./typings2/NonNullableAt";
import { Override } from "./typings2/Override";

export declare const TMetaType: unique symbol;

export type WithMetaType<T> = { [TMetaType]?: T };

export type MetaType<T extends WithMetaType<any>> = NonNullableAt<
  T,
  typeof TMetaType
>;

export type MetaTypeHook<T extends WithMetaType<any>, U extends object> = Omit<
  T,
  typeof TMetaType
> &
  WithMetaType<Override<MetaType<T>, U>>;

export function testMetaType<T>(
  obj: WithMetaType<T>,
  callback: (type: T) => void
) {
  //
}
