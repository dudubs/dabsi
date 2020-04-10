//TODO: use Builder
import {ComponentType, useState} from "react";
import {omit} from "../object/omit";
import {KeysByValue, Pluck} from "../typings";
import {ValueOrFactory} from "../patterns/ValueOrFactory";

export type StoreProp<T> = { store: Store<T> };
export type StateGetter<T> = () => T;
export type StateReducer<T> = (state: T) => T;
export type StateSetter<T> = (getState: StateReducer<T>) => void;
export type StateCallback<T> = (state: T) => void;

export class Store<T> {
    constructor(
        public getter: StateGetter<T>,
        public setter: StateSetter<T>,
    ) {
    }

    get state(): T {
        return this.getter();
    }

    set state(value: T) {
        this.setter(() => value);
    }

    get store(): this {
        return this;
    }

    push(...items: Array<Pluck<T, number>>) {
        return this.asArray().update(prevState => [
            ...prevState,
            ...items,
        ])
    }

    protected callbacks: StateCallback<T>[] = [];
    protected waiters: StateCallback<T>[] = [];

    onUpdate(callback: StateCallback<T>) {
        this.callbacks.push(callback);
        return this;
    }

    removeByKey<K extends keyof Pluck<T, number>>(key: K, value: Pluck<T, number>) {
        return this.asArray().update(prevState => {
            return prevState.filter(prevValue => {
                return prevValue[key] !== value[key]
            })
        })
    }

    remove<K extends keyof T>(key: K) {
        return this.update((prevState): any => {
            if ((typeof key === "number") && Array.isArray(prevState)) {
                return prevState.filter((_, index) => {
                    return index !== key
                })
            }
            const nextState = {...prevState};
            delete nextState[key];
            return nextState;
        })
    }

    asArray(): Store<Array<Pluck<T, number>>> {
        if (!Array.isArray(this.state)) {
            throw new TypeError('State is not Array.')
        }
        return <any>this;
    }

    at<K extends keyof T>(key: K): Store<T[K]> {
        return new Store(() => this.state[key], getState => {
            this.set(key, getState);
        })
    }


    delete() {
        this.setter(() => <any>undefined);
    }

    context(): Store<T> {
        return new Store(this.getter, this.setter)
    }

    set(value: T): Store<T>
    set<K extends keyof T>(key: K, callback: (value: T[K]) => T[K]): Store<T>
    set<K extends keyof T>(key: K, value: T[K]): Store<T>
    set(valueOrKey, valueOrCallback?) {
        return this.update(prevState => {
            if (valueOrCallback !== undefined) {
                return this._setKey(prevState, valueOrKey, valueOrCallback)
            } else {
                return valueOrKey;
            }
        })
    }

    protected _setKey(prevState, key, valueOrCallback) {
        const callback = typeof valueOrCallback === "function" ?
            valueOrCallback : () => valueOrCallback;

        if ((typeof key === "number") && Array.isArray(prevState)) {
            const prevItem = prevState[key];
            const nextItem = callback(prevItem);
            if (nextItem === undefined)
                return prevState.filter((_, index) => index !== key);
            return prevState.map((prevItem, index) => {
                return index === key ? nextItem :
                    prevItem
            })
        }
        const nextValue = callback(prevState[key]);
        if (nextValue === undefined) {
            return omit(prevState, key)
        }
        return {...prevState, [key]: nextValue}
    }

    toggle<K extends KeysByValue<T, boolean>>(key: K): Store<T> {
        return this.update(state => {
            return {...state, [key]: !state[key]}
        })
    }

    assign<K extends keyof T>(props: Pick<T, K>) {
        return this.update(prevState => {
            return {...prevState, ...props}
        })
    }

    reducers: StateReducer<T>[] = [];

    immediate?: ReturnType<typeof setImmediate> = undefined;

    then(callback: (state: T) => void) {
        this.waiters.push(callback);
    }

    update(callback: (state: T) => T): Store<T> {
        this.reducers.push(callback);
        if (this.immediate === undefined) {
            this.immediate = setImmediate(() => {
                this.setter(state => {
                    this.immediate = undefined;
                    const {reducers, waiters} = this;
                    this.reducers = [];
                    this.waiters = [];
                    const proto = Object.getPrototypeOf(state);
                    for (const reduce of reducers) {
                        state = reduce(state);
                    }
                    state = Object.setPrototypeOf(state, proto);
                    for (const callback of this.callbacks) {
                        callback(state);
                    }
                    for (const waiter of waiters) {
                        waiter(state);
                    }
                    return state;
                })

            });
        }
        return this;
    }

    static use<T>(valueOrFactory: ValueOrFactory<T>): Store<T> {
        const [state, setState] = useState<T>(() => {
            return ValueOrFactory(valueOrFactory);
        });
        return new Store<T>(() => state, setState);
    }

    static at<T, K extends keyof T>(obj: T, prop: K): Store<T[K]> {
        return new Store(() => obj[prop], callback => {
            obj[prop] = callback(obj[prop]);
        })
    }

    static on<T>(callback, value?: T): Store<T | undefined> {
        return new Store(() => value, _callback => {
            value = _callback(value);
            callback(value)
        })
    }
}

export type StoreFactory = {
    <T>(valueOrFactory: T): Store<T>;
    <T, K extends keyof T>(obj: T, key: K): Store<T[K]>;
    <T>(props: [
        T,
        (callback: (value: T) => T) => void
    ]): Store<T>;
};

