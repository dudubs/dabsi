import { If, IsUndefined } from "@dabsi/common/typings2/boolean";

export type UndefinedIfIsUndefined<T> = If<IsUndefined<T>, undefined>;
