import {IsNever, Union} from "../common/typings";
import {DataUnion} from "./DataUnion";
import {DebugType, MetaType} from "./MetaType";
import {MapRelation, RelationKeys, RelationTypeAt} from "./Relation";
import AssignRelations = DataUnionRow.AssignRelations;

export type DataUnionRow<T, TypeKey extends string, Children, Relations> =
    IsNever<keyof Children> extends true ? (
        Omit<T, RelationKeys<T> | TypeKey> & AssignRelations<T, Relations>
            ) :
        Union<DataUnionRow.Children<T, TypeKey, Children>>

export declare namespace DataUnionRow {

    type Of<T, E = T> = MetaType.Of<T> extends //
        DataUnion<infer U, infer TypeKey, infer Children, infer Relations> ?
        DataUnionRow<U, TypeKey, Children, Relations> :

        E;


    type Children<T, TypeKey extends string, Children> = {
        [ChildKey in string & keyof Children]:
        DataUnionRow.Child<T, TypeKey, DataUnion.RelationsOf<Children[ChildKey]>,
            Children[ChildKey], ChildKey>
    };


    type ChildrenOf<T> = MetaType.Of<T> extends //
        DataUnion<infer U, infer TypeKey, infer Children, infer Relations> ?
        DataUnionRow.Children<U, TypeKey, Children> : never;



    type ChildRelationTypeAt<Child, Relations, RelationKey extends RelationKeys<Child>> =
        RelationKey extends keyof Relations ?//
            Relations[RelationKey] :
            RelationTypeAt<Child, RelationKey>;

    type AssignRelations<T, Relations> = {
        [RelationKey in RelationKeys<T>]?:

        MapRelation<T[RelationKey], (
            Of<ChildRelationTypeAt<T, Relations, RelationKey>>
            )>
    }

    // type

    type Child<T, TypeKey extends string, Relations, Child, ChildKey extends string> =
        Omit<Child, RelationKeys<Child> | TypeKey>
        & Record<TypeKey, ChildKey>
        & AssignRelations<Child, Relations>

        & DebugType<{
        T: T,
        Child: Child,
        ChildMetaType: MetaType.Of<Child>,
        Relations: Relations,
        ChildRelations: DataUnion.RelationsOf<Child>,

    }>

}

