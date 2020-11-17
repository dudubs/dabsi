import { If } from "./boolean";
import { IsEmptyObject } from "./boolean/IsEmptyObject";

export type UndefinedIfEmptyObject<T> = If<IsEmptyObject<T>, undefined> | T;
