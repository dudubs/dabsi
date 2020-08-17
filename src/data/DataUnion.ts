import {mapObject} from "../common/object/mapObject";
import {Constructor, HasKeys, If, IsNever} from "../common/typings";
import {BaseType} from "./BaseType";
import {MapRelation, RelationKeys, RelationTypeAt, RelationTypeAt as _RelationTypeAt} from "./Relation";


export type DataTypeKey = "$type";
export const DataTypeKey: DataTypeKey = "$type";

export type DataUnionChildrenKey = "$unionChildren";
export type DataUnionChildren<T> =
    Record<DataUnionChildrenKey, T>;

export type DataUnionWithChildren<T> =
    IsNever<T> extends true ? {} :
        HasKeys<T> extends false ? {} :
            Record<DataUnionChildrenKey, T>;

export type DataUnionChildrenOf<T> =
    T extends DataUnionChildren<infer U> ? HasKeys<T> extends true ? U : never : never;

export type DataUnionChildKey<T> =
    IsNever<DataUnionChildrenOf<T>> extends true ? never : string & keyof DataUnionChildrenOf<T>;


type _BaseChild<T> = Constructor<T>;

type _BaseChildren<T> = Record<string, _BaseChild<T>>;

type _BaseRelation<T> =
    Constructor<T> &
    { unionType: new() => any };

type _BaseRelations<T> =
    {
        [K in RelationKeys<T>]?:
        _BaseRelation<_RelationTypeAt<T, K>>
    };

export type DataUnionClass<Base,
    Children extends _BaseChildren<Base>,
    Relations extends _BaseRelations<Base>> =

    Constructor<DataUnion<Base,
        _MapInstances<Children>,
        _MapInstances<Relations>>> &
    {
        unionChildren: Children,
        unionRelations: Relations

        unionType: new () => Base;

    };


export type DataUnion<T, Children, Relations> =
    & BaseType<T>
    & _AssignRelations<T, Relations>
    & DataUnionChildren<{
    [K in keyof Children]:
    & BaseType<Children[K]>
    & _AssignRelations<Children[K], Relations>
}>;


type _MapInstances<T> = {
    [K in keyof T]:
    InstanceType<Extract<T[K], Constructor<any>>>
};
type _AssignRelations<T, Relations> =
// TODO: Assign
    Omit<T, RelationKeys<T>>
    & {
    [K in RelationKeys<T>]:

    MapRelation<T[K],
        K extends keyof Relations ?
            Relations[K] :
            RelationTypeAt<T, K>>

};

export function DataUnion<T,
    R extends _BaseRelations<T> = {},
    C extends _BaseChildren<T> = {}>(
    type: Constructor<T>,
    union: {
        relations?: R,
        children?: C
    },
): DataUnionClass<T, C, R>


export function DataUnion(
    type,
    {children = {}, relations = {}}
) {

    Object.defineProperty(Class, "name", {
        value: type.name
    });

    if (DataUnion.isDataUnion(type)) {
        throw new Error('Not support yet.')
    }

    Class.unionType = type;
    Class.unionChildren = mapObject(children, (child: _BaseChild<any>) => {
        if (DataUnion.isDataUnion(child)) {
            return DataUnion(<any>child.unionType, {
                relations: {
                    ...relations,
                    ...child.unionRelations
                },
                children: child.unionChildren
            })
        } else {
            return DataUnion(child, {relations})
        }
    });
    Class.unionRelations = relations;


    return <any>Class;

    function Class() {
        throw new Error()
    }
}


DataUnion.isDataUnion = function (obj): obj is DataUnionClass<any, any, any> {
    return 'unionType' in obj
}
