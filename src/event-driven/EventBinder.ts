import {touchMap} from "../common/map/touchMap";
import {ExtractKeys, PickByValue, Union} from "../common/typings";
import {EventArgs} from "./EventArgs";
import {EventCallback} from "./EventCallback";


export type EventObject<T> = Union<{
    [K in keyof T]:
    { type: string & K, data: EventArgs<T[K]> }
}>;
export type EventListener<T> = (event: EventObject<T>) => void;

export class EventBinder<T> {

    callbacks = new Map<string, Set<(...args) => void>>();
    listeners = new Set<EventListener<T>>();

    on<K extends keyof T>(key: string & K, callback: EventCallback<T[K]>): this {
        touchMap(this.callbacks, key, () => new Set()).add(callback)
        return this;
    }

    off<K extends keyof T>(key: string & K, callback: EventCallback<T[K]>): this {
        this.callbacks.get(key)?.delete(callback);
        return this;
    }


    once<K extends keyof T>(key: string & K, callback: EventCallback<T[K]>): this {
        const _this = this;
        this.on(key, function _callback() {
            _this.off(key, _callback);
            callback.apply(this, arguments);
        })
        return this;
    }

    listen(listener: EventListener<T>) {
        this.listeners.add(listener);

        return () => {
            this.listeners.delete(listener);
        }
    }

    emit<K extends keyof T>(key: string & K, ...args: EventArgs<T[K]>): this {

        const event = {type: key, data: args};

        for (let listener of this.listeners) {
            listener(<any>event);
        }
        this.callbacks.get(key)?.forEach(callback => {
            callback(...args)
        })
        return this;
    }


}
