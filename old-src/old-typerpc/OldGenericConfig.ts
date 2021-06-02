// import { touchMap } from "@dabsi/common/map/touchMap";
// import { Awaitable } from "@dabsi/common/typings2/Async";
// import { Is } from "@dabsi/common/typings2/boolean/Is";
// import { IsNever } from "@dabsi/common/typings2/boolean/IsNever";
// import { Fn } from "@dabsi/common/typings2/Fn";

// const genericConfigCache = new WeakMap();

// declare const isGenericConfig: unique symbol;

// export type GenericConfig<T extends Fn = any> = {
//   (configure: T): Awaitable<ReturnType<T>>;
//   [isGenericConfig]?: true;
// };

// export type FnIsGenericConfig<T extends Fn> = Is<
//   Required<T>,
//   { [isGenericConfig]: true }
// >;

// export type IsGenericConfig<T> = IsNever<T> extends true
//   ? false | true
//   : T extends Fn
//   ? Required<T> extends {
//       [isGenericConfig]: true;
//     }
//     ? true
//     : false
//   : false;

// export function GenericConfig<T extends GenericConfig>(
//   genericConfig: T
// ): ReturnType<T> {
//   return touchMap(genericConfigCache, genericConfig, () => {
//     return genericConfig(x => x);
//   });
// }
