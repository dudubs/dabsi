import { touchMap } from "@dabsi/common/map/touchMap";
import { MetaType, WithMetaType } from "@dabsi/common/MetaType";
import { Emitter } from "@dabsi/view/react/reactor/useEmitter";

export type ReactorEvent<T> = new (...args) => T;

export type ReactorListener = (action: any, emittable?: Emittable<any>) => void;
export type EmittableType<T extends Emittable<any>> = MetaType<T>["emittable"];
export type Emittable<T> = {
  id: number;
  init: T | undefined;
} & WithMetaType<{ emittable: T }>;

let counter = 0;

export function Emittable<T>(): Emittable<T | undefined>;
export function Emittable<T>(init: T): Emittable<T>;
export function Emittable(init?): Emittable<any> {
  return { id: ++counter, init };
}

// UserInfoEvent = Emittable<UserInfo>();

export class Reactor {
  protected eventMap = new Map();

  protected eventListenerMap = new Map<any, Set<ReactorListener>>();

  constructor(
    protected handle?: (event: any, emittable: Emittable<any>) => boolean | void
  ) {}

  getLast<T extends Emittable<any>>(
    emittable: T
  ): EmittableType<T> | undefined {
    return this.eventMap.get(emittable.id);
  }

  emit<T extends Emittable<any>>(emittable: T, event: EmittableType<T>) {
    if (this.handle?.(event, emittable) === false) return;
    this.eventMap.set(emittable.id, event);
    this.eventListenerMap.get(emittable.id)?.forEach(callback => {
      callback(event, emittable);
    });
  }

  listen<T extends Emittable<any>>(
    emittable: T,
    callback: (event: EmittableType<T>) => void
  ) {
    const listeners = touchMap(
      this.eventListenerMap,
      emittable.id,
      () => new Set()
    );
    listeners.add(callback);
    return () => {
      listeners.delete(callback);
      if (!listeners.size) {
        this.eventListenerMap.delete(emittable.id);
      }
    };
  }
}

export const RootReactor = new Reactor();

// EventMap
