import { WeakMapFactory } from "../../common/map/mapFactory";
import { WithMetaType } from "../../common/MetaType";
import { useReactor } from "./hooks";
import { Emittable, EmittableType } from "./Reactor";

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
