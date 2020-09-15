import {NonNullableAt} from "./typings";


export type WithMetaType<T> = { TMetaType?: T }

export type MetaType<T extends { TMetaType? }> =
    NonNullableAt<T, 'TMetaType'>;

export type MetaTypeHook<T extends AnyT,AnyT extends WithMetaType<any>, U> =
    WithMetaType<Omit<MetaType<T>,(keyof MetaType<AnyT>)|(keyof U)> & U>;
