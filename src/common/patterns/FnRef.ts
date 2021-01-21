import { Fn } from "@dabsi/common/typings2/Fn";

export type FnRef<T extends Fn> = T & { current: T };

export function FnRef<T extends Fn>(current?: T): T & { current: T } {
  FnRef.current = current as any;
  return <any>FnRef;

  function FnRef(this: any) {
    return FnRef.current.apply(this, arguments);
  }
}
