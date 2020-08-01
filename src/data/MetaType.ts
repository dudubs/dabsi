import {Assign} from "../common/typings";

export const MetaType = Symbol();

export type MetaType<T> = { [MetaType]?: T };

export namespace MetaType {
    export type Of<T> =
        (Required<T> extends Required<MetaType<infer U>> ? U : {});

    export type Extend<T, U = {}> = Omit<T, typeof MetaType> &
        MetaType<Assign<Of<T>, U>>;
}


export const DebugType = Symbol();
export type DebugType<T> = { [DebugType]: T };
