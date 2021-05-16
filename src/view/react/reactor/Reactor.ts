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
  protected _emittableEventMap = new Map<Emittable<any>, any>();

  protected _emittableCallbacksMap = new Map<
    Emittable<any>,
    Set<ReactorListener>
  >();

  protected _children = new Set<Reactor>();

  constructor(
    protected handle?: (
      event: any,
      emittable: Emittable<any>
    ) => boolean | void,
    protected parent?: Reactor
  ) {
    this.parent?._children.add(this);
  }

  close() {
    this.parent?._children.delete(this);
  }

  getLast<T extends Emittable<any>>(
    emittable: T
  ): EmittableType<T> | undefined {
    return (
      this._emittableEventMap.get(emittable) ?? this.parent?.getLast(emittable)
    );
  }

  emit<T extends Emittable<any>>(emittable: T, event: EmittableType<T>) {
    if (this.handle?.(event, emittable) === false) return;
    this._emittableEventMap.set(emittable, event);
    this._emittableCallbacksMap.get(emittable)?.forEach(callback => {
      callback(event, emittable);
    });
    this._children.forEach(child => {
      child.emit(emittable, event);
    });
  }

  listen<T extends Emittable<any>>(
    emittable: T,
    callback: (event: EmittableType<T>) => void
  ) {
    const callbacks = touchMap(
      this._emittableCallbacksMap,
      emittable,
      () => new Set()
    );
    callbacks.add(callback);
    return () => {
      callbacks.delete(callback);
      if (!callbacks.size) {
        this._emittableCallbacksMap.delete(emittable);
      }
    };
  }
}

export const RootReactor = new Reactor();

// EventMap
