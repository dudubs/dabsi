import { NonNullableAt } from "./typings2/NonNullableAt";
import { Override } from "./typings2/Override";

export declare const TMetaType: unique symbol;

export type WithMetaType<T> = { [TMetaType]?: T };

export type MetaType<T extends WithMetaType<any>> = NonNullableAt<
  T,
  typeof TMetaType
>;

declare global {
  function testMetaType<T>(obj: WithMetaType<T>, callback: (type: T) => void);
}
