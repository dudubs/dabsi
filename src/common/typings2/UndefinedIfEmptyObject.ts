import { If } from "./boolean";
import { IsEmptyObject } from "@dabsi/common/typings2/boolean/IsEmptyObject";

export type UndefinedIfEmptyObject<T> = If<IsEmptyObject<T>, undefined> | T;
