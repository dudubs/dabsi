//TODO: use ObjectBuilder
import {ComponentType} from "react";
import {omit} from "../../common/object/omit";

export type StoreInputProps<T> = { store?: Store<T> };
export type StoreInputComponent<T> = ComponentType<StoreInputProps<T>>;

export type StoreProp<T> = { store: Store<T> };
export type Puller<T> = () => T;
export type Reducer<T> = (state: T) => T;
export type Pusher<T> = (reducer: Reducer<T>) => void;
export type StateCallback<T> = (state: T) => void;


export class Store<T> {
    constructor(
        public puller: Puller<T>,
        public pusher: Pusher<T>,
    ) {
    }

    get state(): T {
        return this.puller();
    }

    set state(value: T) {
        this.pusher(() => value);
    }

    get store(): this {
        return this;
    }


    add<T>(this: Store<T[]>, ...items: T[]): Store<T[]> {
        return this.push(prevState => [
            ...prevState,
            ...items,
        ])
    }

    listen<T>(this: Store<T>, callback: (state: T) => void) {
        this.listeners.add(callback);
        return () => {
            this.listeners.delete(callback);
        }
    }

    cast<T, U>(
        this: Store<T>,
        down: (value: T) => U,
        up: (value: U) => T
    ) {
        return new Store<U>(
            () => down(this.puller()),
            reducer => {
                this.push(state =>
                    up(
                        reducer(
                            down(state)
                        )
                    )
                )
            }
        )
    }

    protected listeners = new Set<StateCallback<T>>();


    remove<T>(this: Store<T[]>, callback: (item: T, index: number) => boolean): Store<T[]> {
        return this.push(state => state.filter(callback))
    }

    at<T, K extends keyof T>(this: Store<T>, key: K): Store<T[K]> {
        return new Store(() => this.state[key], reducer => {
            this.push(state => {
                return this.reduceKey(state, key, reducer)
            })
        })
    }

    toDelete<T>(this: Store<T | undefined>,
                isEmpty: (value: T) => boolean): Store<T | undefined> {
        return this.toPush(state => {
            if (typeof state !== "undefined") {
                if (isEmpty(state)) {
                    return undefined
                }
            }
            return state;
        })
    }

    toPush<T>(this: Store<T>, reducer: (value: T) => T): Store<T> {
        return new Store(this.puller, state => {
            this.pusher(prevState => {
                return reducer(state(prevState))
            })
        })
    }


    toPull<T>(this: Store<T>, reducer: (value: T) => T): Store<T> {
        return new Store(() => reducer(this.puller()), this.pusher)
    }

    default<T>(this: Store<T | undefined>, defaultValue: NonNullable<T>): Store<T> {
        return new Store<T>(() => this.puller() ?? defaultValue, reducer => {
            this.push(value => {
                value = reducer(value ?? defaultValue);
                if (typeof value?.['length'] === "number") {
                    return value['length'] ? value : undefined;
                }
                return value;
            })
        })
    }

    delete() {
        this.pusher(() => <any>undefined);
    }


    set<T>(this: Store<T>, value: T): Store<T> {
        return this.push(() => value)
    }

    protected reduceKey(prevState, key, valueOrCallback) {


        const reducer = typeof valueOrCallback === "function" ?
            valueOrCallback : () => valueOrCallback;

        if ((typeof key === "number") && Array.isArray(prevState)) {
            const prevItem = prevState[key];
            const nextItem = reducer(prevItem);
            if (nextItem === undefined)
                return prevState.filter((_, index) => index !== key);
            return prevState.map((prevItem, index) => {
                return index === key ? nextItem :
                    prevItem
            })
        }
        const nextState = reducer(prevState[key]);
        if (nextState === undefined) {
            return omit(prevState, key)
        }
        return {...prevState, [key]: nextState}
    }

    assign<K extends keyof T>(props: Pick<T, K>) {
        return this.push(prevState => {
            return {...prevState, ...props}
        })
    }

    reducers: Reducer<T>[] = [];

    isUpdating = false;


    protected reduce(state) {
        const {reducers} = this;
        this.reducers = [];
        const proto = state && Object.getPrototypeOf(state);
        for (const reducer of reducers) {
            state = reducer(state);
        }
        if (proto && state)
            state = Object.setPrototypeOf(state, proto);
        for (let listener of this.listeners) {
            listener(state);
        }
        return state;
    }

    push<T>(this: Store<T>, reducer: Reducer<T>): Store<T> {
        this.reducers.push(reducer);
        if (!this.isUpdating) {
            this.isUpdating = true;
            this.pusher(state => {
                this.isUpdating = false;
                try {
                    return this.reduce(state);
                } catch (err) {
                    console.error(err);
                    return state
                }
            })
        }
        return this;
    }

    map<T, U>(this: Store<T[] | undefined>,
              mapper: (store: Store<T>, index: number) => U): U[] | undefined {
        return this.state?.map((item, index) =>
            mapper((this as Store<T[]>).at(index), index)
        )
    }

}
