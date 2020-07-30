export const MetaType = Symbol();

export type MetaType<T> = { [MetaType]?: T };

export namespace MetaType {
    export type Of<T> =
        (Required<T> extends Required<MetaType<infer U>> ? U : {});

    export type Extend<T, U = {}> = MetaType<Omit<Of<T>, keyof U> & U>;
}


export const DebugType = Symbol();
export type DebugType<T> = { [DebugType]: T };
