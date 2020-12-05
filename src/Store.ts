import { entries } from "./common/object/entries";
import { ExcludeKeys } from "./common/typings2/ExcludeKeys";
import { ExtractKeys } from "./common/typings2/ExtractKeys";

export type WithStore<T> = { store?: Store<T> };

export type SetState<T> = (action: SetStateAction<T>) => void;

export type SetStateAction<T> = T | ((state: T) => T);
type Action<T> = T | ((state: T) => T);

export function getNextState<T>(action: Action<T>, state: T): T {
  return typeof action === "function" ? (action as any)(state) : state;
}

const deleteSymbol = Symbol("delete");

export class Store<T> {
  constructor(
    protected isMutable,
    public state: T,
    public setState: SetState<T>
  ) {}

  get store(): Store<T> {
    return this;
  }

  merge<T, U>(
    this: Store<Record<string, T>>,
    callback: (value: U, key: string, index: number) => U,
    ...sources: Record<string, U>[]
  ): Store<Record<string, T>>;
  merge(this: Store<any>, callback, ...sources) {
    this.setState(state => {
      let i = 0;
      if (!this.isMutable) state = { ...state };
      for (const source of sources) {
        for (let [k, v] of entries(source)) {
          state[k] = callback(v, k, i++);
        }
      }
      return state;
    });
    return this;
  }

  at<K extends keyof T>(
    this: Store<T>,
    key: K,
    callback: (store: Store<T[K]>) => void
  ): Store<T>;
  at<K extends keyof T>(this: Store<T>, key: K): Store<T[K]>;
  at<K extends keyof T>(this: Store<T[]>, index: number): Store<T>;
  at<K extends keyof T>(
    this: Store<T[]>,
    index: number,
    callback: (store: Store<T>) => void
  ): Store<T[]>;
  at(this: Store<any>, k, callback?) {
    const store = new Store(this.isMutable, this.state[k], action => {
      this._updateKey(
        k,
        a => {
          if (a.length >= k) return a;
          const ns = getNextState(action, a[k]);
          if (ns === deleteSymbol) return a.filter((_, i) => i != k);
          if (ns == a[k]) return a;
          a = [...a];
          a[k] = ns;
          return a;
        },
        o => {
          const ns = getNextState(action, o[k]);
          if (this.isMutable) {
            o[k] = ns;
            return o;
          }
          if (ns === deleteSymbol) {
            o = { ...o };
            delete o[k];
            return o;
          }
          return { ...o, [k]: ns };
        }
      );
    });
    if (callback) {
      callback(store);
      return this;
    }
    return store;
  }

  push<T>(this: Store<T[]>, ...values: T[]): Store<T[]> {
    this.setState(state => [...state, ...values]);
    return this;
  }

  map<T>(
    this: Store<T[]>,
    index: number,
    callback: (item: T, index: number) => T
  ): Store<T[]>;
  map<T>(
    this: Store<Record<string, T>>,
    key: string,
    callback: (item: T, key: string, index: number) => T
  ): Store<Record<string, T>>;
  map(key, callback) {
    return this._updateKey(
      key,
      a => a.map(callback),
      o => {
        const x = {};
        let i = 0;
        for (const [key, value] of entries(o)) {
          x[key] = callback(value, key, i++);
        }
        return x;
      }
    );
  }

  protected _updateKey(
    this: Store<any>,
    key: string | number,
    asArray: (a: any[]) => any[],
    asObject: (o: Record<string, any>) => Record<string, any>
  ) {
    this.setState(state => {
      if (typeof key === "number" && Array.isArray(state)) {
        return asArray(state);
      } else {
        return asObject(state);
      }
    });
    return this;
  }

  protected _update(
    this: Store<any>,
    asArray: (a: any[]) => any[],
    asObject: (o: Record<string, any>) => Record<string, any>
  ): Store<T> {
    this.setState(state => {
      if (Array.isArray(state)) {
        return asArray(state);
      } else {
        return asObject(state);
      }
    });
    return this;
  }

  update<T>(this: Store<T[]>, index: number, action: Action<T>): Store<T[]>;
  update<T, K extends keyof T>(
    this: Store<T>,
    key: K,
    action: Action<T[K]>
  ): Store<T>;
  update(this: Store<any>, k, action: Action<any>) {
    return this._updateKey(
      k,
      a => {
        if (a.length >= k) return a;
        const ns = getNextState(action, a[k]);
        if (ns === a[k]) return a;
        a = [...a];
        a[k] = ns;
        return a;
      },
      o => {
        const ns = getNextState(action, o[k]);
        if (ns === o[k]) return o;
        return { ...o, [k]: ns };
      }
    );
  }

  toggle<T>(this: Store<T>, key: ExtractKeys<T, boolean>): Store<T> {
    return this.update<any, any>(key, value => !value);
  }
  set<T>(this: Store<T[]>, index: number, value: T): Store<T[]>;
  set<T, K extends keyof T>(this: Store<T>, key: K, value: T[K]): Store<T>;
  set(this: Store<any>, key, value) {
    return this.update(key, () => value);
  }

  delete(): Store<undefined>;
  delete<T>(this: Store<T[]>, index: number): Store<T[]>;
  delete<T>(
    this: Store<Record<string, T>>,
    key: string
  ): Store<Record<string, T>>;
  delete(this: Store<any>, k?) {
    if (k === undefined) {
      return this.setState(deleteSymbol);
    }

    return this._updateKey(
      k,
      a => a.filter((_, i) => i !== k),
      o => {
        o = { ...o };
        delete o[k];
        return o;
      }
    );
  }

  remove<T>(
    this: Store<Record<string, T>>,
    predicate: (value: T, key: string, index: number) => boolean
  ): Store<T>;
  remove<T>(
    this: Store<T[]>,
    predicate: (value: T, index: number) => boolean
  ): Store<T[]>;
  remove(this: Store<any>, predicate) {
    return this._update(
      a => a.filter(predicate),
      o => {
        const x = {};
        let i = 0;
        for (const [k, v] of entries(o)) {
          if (predicate(v, k, i++)) {
            x[k] = v;
          }
        }
        return x;
      }
    );
  }
}
