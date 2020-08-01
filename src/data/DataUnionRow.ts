import {IsNever, Union} from "../common/typings";
import {DataUnion} from "./DataUnion";
import {DebugType, MetaType} from "./MetaType";
import {MapRelation, RelationKeys, RelationTypeAt} from "./Relation";
import AssignRelations = DataUnionRow.AssignRelations;

export type DataTypeKey = "$type";
export const DataTypeKey: DataTypeKey = "$type";

export type DataUnionRow<Base, Children, Relations> =
    IsNever<keyof Children> extends true ?

        Omit<Base, RelationKeys<Base>> &
        AssignRelations<Base, Relations> :

        Union<DataUnionRow.Children<Base, Children>>;

export declare namespace DataUnionRow {

    type Of<T, E = T> = MetaType.Of<T> extends //
        DataUnion<infer Base, infer Children, infer Relations> ?
        DataUnionRow<Base, Children, Relations> :

        E;


    type Children<T, Children> = {
        [ChildKey in string & keyof Children]:
        DataUnionRow.Child<T, DataUnion.RelationsOf<Children[ChildKey]>,
            Children[ChildKey], ChildKey>
    };


    type ChildrenOf<T> = MetaType.Of<T> extends //
        DataUnion<infer Base, infer Children, infer Relations> ?
        DataUnionRow.Children<Base, Children> : never;


    type ChildRelationTypeAt<Child, Relations,
        RelationKey extends RelationKeys<Child>> =
        RelationKey extends keyof Relations ?//
            Relations[RelationKey] :
            RelationTypeAt<Child, RelationKey>;
        // RelationTypeAt<Child, RelationKey>;

    type AssignRelations<T, Relations> = {
        [K in RelationKeys<T>]?:

        MapRelation<T[K], (
            // Of<RelationTypeAt<T, K>>
            Of<ChildRelationTypeAt<T, Relations, K>>
            )>
    }

    // type


    type Child<Base, Relations, Child, ChildKey extends string> =
        Omit<Child, RelationKeys<Child>>
        & Record<DataTypeKey, ChildKey>
        & AssignRelations<Child, Relations>

        & DebugType<{
        Base: Base,
        Child: Child,
        ChildMetaType: MetaType.Of<Child>,
        Relations: Relations,
        ChildRelations: DataUnion.RelationsOf<Child>,

    }>

}

