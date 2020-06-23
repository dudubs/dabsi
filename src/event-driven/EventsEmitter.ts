import {EventArgs} from "./EventArgs";

export type EventsEmitter<T> = {
    callbacks: Map<string, Set<(...args) => void>>;
    <K extends keyof T>(type: K, ...args: EventArgs<T[K]>): void;
};

export function EventsEmitter<T>(): EventsEmitter<T> {

    Emitter.callbacks = new Map<string, Set<(...args) => void>>();

    return Emitter

    function Emitter(type, ...args) {
        Emitter.callbacks.get(type)?.forEach(callback => {
            callback(...args);
        })
        return this;
    }
}



