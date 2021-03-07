import { useReactor } from "./hooks";
import { Emittable, EmittableType } from "@dabsi/view/react/reactor/Reactor";

export type Emitter = {
  <T extends Emittable<any>>(emittable: T, event: EmittableType<T>): void;
};

export function useEmitter(): Emitter {
  const reactor = useReactor();
  return (emittable, event?) => {
    reactor.emit(emittable, event);
  };
}
