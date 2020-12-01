import { touchMap } from "../../common/map/touchMap";

export type ReactorEvent<T> = new (...args) => T;

export type ReactorListener = (action: any) => void;

export class Reactor {
  protected eventMap = new Map();
  protected eventListenerMap = new Map<Function, Set<ReactorListener>>();

  constructor(protected handle?: (event: object) => boolean | void) {}

  getLast<T>(event: ReactorEvent<T>): T | undefined {
    return this.eventMap.get(event.constructor);
  }

  emit(event: object) {
    if (this.handle?.(event) === false) return;
    this.eventMap.set(event.constructor, event);
    const listeners = this.eventListenerMap.get(event.constructor);
    for (const callback of listeners || []) {
      callback(event);
    }
  }

  listen<T>(eventType: ReactorEvent<T>, callback: (action: T) => void) {
    const listeners = touchMap(
      this.eventListenerMap,
      eventType,
      () => new Set()
    );
    listeners.add(callback);
    return () => {
      listeners.delete(callback);
      if (!listeners.size) {
        this.eventListenerMap.delete(eventType);
      }
    };
  }
}

export const RootReactor = new Reactor();

export function emit(event: object) {
  RootReactor.emit(event);
}
// EventMap
