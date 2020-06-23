import {touchMap} from "../common/map/touchMap";
import {EventArgs} from "./EventArgs";
import {EventsEmitter} from "./EventsEmitter";

export type EventsBinder<T> = <K extends keyof T, This>(
    this: This,
    key: K,
    callback: (...args: EventArgs<T[K]>) => void
) => This;


export function EventsBinder<T>(emitter: EventsEmitter<T>) {
    return function (type, callback) {
        touchMap(emitter.callbacks, type, () => new Set())
            .add(callback);
        return this;
    }
}

