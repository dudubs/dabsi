import { WeakMapFactory } from "@dabsi/common/map/mapFactory";
import { WithMetaType } from "@dabsi/common/MetaType";
import { useReactor } from "@dabsi/react/reactor/hooks";
import { Emittable, EmittableType } from "@dabsi/react/reactor/Reactor";

export type Emitter = {
  <T extends Emittable<any>>(emittable: T, event: EmittableType<T>): void;
};

export function useEmitter(): Emitter {
  const reactor = useReactor();
  return (emittable, event?) => {
    reactor.emit(emittable, event);
  };
}

// const AdminInfo = Emittable<{}>;
