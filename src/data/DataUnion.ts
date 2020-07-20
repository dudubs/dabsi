import {Pluck, Type, Union} from "../common/typings";
import {MapRelation, NonRelationKeys, RelationKeys, RelationTypeAt} from "./Relation";

export const DataUnionMetaType = "$uMetaType";//Symbol();


export type DataUnion<T,
    K extends NonRelationKeys<T>,
    Children extends DataUnion.Children<T>,
    Relations extends DataUnion.Relations<T>> = {
    unionType: Type<T>,
    unionPropertyKey: K,
    unionChildren: Children;
    unionRelations: Relations;


};


export declare namespace DataUnion {

    type MetaType<U extends AnyDataUnion> = { [DataUnionMetaType]?: U };

    type MetaTypeOf<T> =
        Required<T> extends Required<MetaType<infer U>> ? U : never;


    // RowWithRelations
    type RowWithRelations<T,
        TypeKey extends NonRelationKeys<T>,
        Children extends DataUnion.Children<T>,
        Relations extends DataUnion.Relations<T>> =

        Omit<T, TypeKey | (keyof Relations) | (typeof DataUnionMetaType)>
        & MetaType<DataUnion<T, TypeKey, Children, {}>>

        & Record<TypeKey, keyof Children>
        & {
        [K in keyof Relations]?: MapRelation<Pluck<T, K>, (
            RowWithRelationsOf<NonNullable<Relations[K]>>
            )>
    };

    type RowWithRelationsOf<T extends AnyDataUnion, Else = never> =
        T extends DataUnion<infer U, infer TypeKey, infer Children, infer Relations> ?

            RowWithRelations<U, TypeKey, Children, Relations> :

            Else;

    type Row<T, TypeKey extends NonRelationKeys<T>,
        Children extends DataUnion.Children<T>,
        Relations extends DataUnion.Relations<T>> = Union<{

        [K in keyof Children]:
        Omit<ChildTypeOf<Children[K]>, (TypeKey | (keyof Relations))>
        & Record<TypeKey, K>
        & {
        [K in keyof Relations]?:
        MapRelation<Pluck<T, K>, RowOf<Relations[K]>>
    }

    }>;


    type RowOf<T> =
        T extends DataUnion<infer U, infer K, infer Children, infer Relations> ?
            Row<U, K, Children, Relations> : never;


    type ChildType<T> = new(...args: any[]) => any;

    type ChildTypeOf<T> =
        T extends AnyClass<infer U> ? U :
            T extends Type<infer U> ? U : never;

    type Children<T> = Record<string, ChildType<T>>;

    type ChildrenOf<T> =
        T extends DataUnion<any, any, infer U, any> ? U : never;

    type AnyClass<T> = Class<T, any, any, any>;

    type Relations<T> = {
        [K in RelationKeys<T>]?:
        Class<RelationTypeAt<T, K>, any, any, any>
    };

    type Class<T,
        K extends NonRelationKeys<T>,
        Children extends DataUnion.Children<T>,
        Relations extends DataUnion.Relations<T>> =
    // MetaType<DataUnion<T, K, Children, Relations>>&
        DataUnion<T, K, Children, Relations> & {

        $debugUnion: DataUnion<T, K, Children, Relations>
        $debugInstance: T;

        $debugChildTypeOf: {
            [K in keyof Children]: ChildTypeOf<Children[K]>
        }


        new(): MetaType<DataUnion<T, K, Children, Relations>>
            & T
        // & Omit<T, keyof Relations>
        // & RelationsRow<T, Relations>

    };
}

export type AnyDataUnion = DataUnion<any, any, any, any>;


export function DataUnion<T,
    P extends NonRelationKeys<T>,
    Children extends DataUnion.Children<T>,
    Relations extends DataUnion.Relations<T>>(
    type: Type<T>,
    typePropertyName: P,
    children: Children,
    relations?: Relations
): DataUnion.Class<T, P, Children, Relations> {


    Object.defineProperty(Class, "name", {
        value: `Union(${type.name})`
    })

    Class.unionType = type;
    Class.unionChildren = children;
    Class.unionRelations = relations;

    return <any>Class;

    function Class() {
        throw new Error()
    }
}

