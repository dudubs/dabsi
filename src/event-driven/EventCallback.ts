import {EventArgs} from "./EventArgs";

export type EventCallback<T> = (...args: EventArgs<T>) => void;
