import {touchMap} from "../common/map/touchMap";
import {EventCallback} from "./EventCallback";

export  type EventMap<T> = Map<PropertyKey, Set<(...args) => void>>;
