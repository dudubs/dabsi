import { Fn } from "../typings";

export type FnRef<T extends Fn> = T & { current: T };

export function FnRef<T extends Fn>(): T & { current: T } {
  FnRef.current = undefined as any;
  return <any>FnRef;

  function FnRef(this: any) {
    return FnRef.current.apply(this, arguments);
  }
}
