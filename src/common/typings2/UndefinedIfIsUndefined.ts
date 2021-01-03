import { If, IsUndefined } from "./boolean";

export type UndefinedIfIsUndefined<T> = If<IsUndefined<T>, undefined>;
