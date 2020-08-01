import {DataUnion} from "./DataUnion";
import {DataUnionRow} from "./DataUnionRow";
import {MetaType} from "./MetaType";

export type DataRow<T> = MetaType.Of<T> extends //
    DataUnion<infer Base, infer Children, infer Relations> ?
    DataUnionRow<Base, Children, Relations> :
    T;
