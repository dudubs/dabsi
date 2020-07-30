import {mapObject} from "../common/object/mapObject";
import {Assign, Type} from "../common/typings";
import {MetaType} from "./MetaType";
import {NonRelationKeys, RelationKeys, RelationTypeAt} from "./Relation";


export type DataUnion<T, K extends string, Children, Relations> = {
    unionType: Type<T>,
    unionTypePropertyName: K,
    unionChildren: Children;
    unionRelations: Relations;


};

export declare namespace DataUnion {

    // RowWithRelations


    type RowOf<T> =
        any;

    type Child<T> = (new(...args: any[]) => T) ;

    type Children<T> = Record<string, Child<T>>;

    type ChildrenOf<T> =
        MetaType.Of<T> extends DataUnion<any, any, infer U, any> ? U : {};

    type Relation<T> = new(...args: any[]) => Instance<T, any, any, any>;

    type Relations<T> = {
        [K in RelationKeys<T>]?:
        Relation<RelationTypeAt<T, K>>
    };

    type RelationsOf<T> =
        MetaType.Of<T> extends DataUnion<any, any, any, infer U> ? U : {};

    type Class<T,
        TypeKey extends NonRelationKeys<T>,
        Children extends DataUnion.Children<T>,
        Relations extends DataUnion.Relations<T>> =
    // MetaType<DataUnion<T, K, Children, Relations>>&
        DataUnion<T, TypeKey, Children, Relations> & {

        prototype: Instance<T, TypeKey, Children, Relations>;

        new(): Instance<T, TypeKey, Children, Relations>;

    };

    type MergeChildrenWithRelations<Children, Relations> = {
        [ChildKey in keyof Children]: MetaType.Of<Children[ChildKey]> extends //
            DataUnion<infer Child, infer ChildTypeKey, infer ChildChildren, infer ChildRelations> ?
            MetaType<DataUnion<Child, ChildTypeKey, ChildChildren, Assign<Relations, ChildRelations>>>
            & Children[ChildKey] :
            MetaType<DataUnion<Children[ChildKey], never, {}, Relations>>
            & Children[ChildKey];
    };

    type Instance<T,
        TypeKey extends string,
        Children extends DataUnion.Children<T>,
        Relations extends DataUnion.Relations<T>> =
        MetaType<DataUnion<T, TypeKey,
            MergeChildrenWithRelations<MapInstances<Children>, MapInstances<Relations>>,
            MapInstances<Relations>>> & T;

    type MapInstances<T> =
        { [K in keyof T]: InstanceType<Extract<T[K], new(...args: any[]) => any>> }
}


export function DataUnion<T,
    P extends NonRelationKeys<T>,
    Children extends DataUnion.Children<T>,
    Relations extends DataUnion.Relations<T> = {}>(
    type: Type<T>,
    typePropertyName: P,
    children: Children,
    relations?: Relations
): DataUnion.Class<T, P, Children, Relations>
export function DataUnion<T,
    Relations extends DataUnion.Relations<T>>(
    type: Type<T>,
    relations: Relations
): DataUnion.Class<T, never, {}, Relations>
export function DataUnion(
    type,
    ...args
) {

    let children;
    let relations;
    let typePropertyName;

    if (args.length >= 2) {
        [typePropertyName, children, relations] = args;
        if (!relations)
            relations = {};
    } else {
        typePropertyName = undefined;
        children = {};
        [relations] = args;
    }

    Object.defineProperty(Class, "name", {
        value: type.name
    })

    Class.unionType = type;
    Class.unionChildren = mapObject(children, (child: DataUnion.Child<any>) => {
        if (DataUnion.isDataUnion(child)) {
            return DataUnion(child.unionType,
                child.unionTypePropertyName,
                child.unionChildren,
                {
                    ...relations,
                    ...child.unionRelations
                })
        } else {
            return DataUnion(child, relations)
        }
    });
    Class.unionTypePropertyName = typePropertyName;
    Class.unionRelations = relations;


    return <any>Class;

    function Class() {
        throw new Error()
    }
}


DataUnion.isDataUnion = function (obj): obj is DataUnion<any, any, any, any> {
    return 'unionType' in obj
}
