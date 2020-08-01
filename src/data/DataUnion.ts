import {mapObject} from "../common/object/mapObject";
import {Assign, Pluck} from "../common/typings";
import {MetaType} from "./MetaType";
import {MapRelation, RelationKeys, RelationTypeAt as _RelationTypeAt} from "./Relation";


export type DataUnion<Base, Children, Relations> = {
    unionType: Base,
    unionChildren: Children;
    unionRelations: Relations;

};

export declare namespace DataUnion {


    type Child<T> = (new(...args: any[]) => T) ;

    type Children<T> = Record<string, Child<T>>;

    type Relation<T> =
        new(...args: any[]) => Instance<T, any, any>;

    type Relations<T> = { [K in RelationKeys<T>]?: Relation<_RelationTypeAt<T, K>> };

    type RelationTypeAt<T, K extends RelationKeys<T>> =
        K extends keyof RelationsOf<T> ? RelationsOf<T>[K] :
            _RelationTypeAt<T, K>;

    type RelationsOf<T> =
        MetaType.Of<T> extends DataUnion<any, any, infer U> ? U : {};

    type ChildrenOf<T> =
        MetaType.Of<T> extends DataUnion<any, infer U, any> ? U : {};

    type Class<Base,
        Children extends DataUnion.Children<Base>,
        Relations extends DataUnion.Relations<Base>> =
        DataUnion<Base, Children, Relations> & {

        new(): Instance<Base, Children, Relations>;

    };

    type MergeRelations<T, Relations> =
        Assign<T, {
            [K in RelationKeys<T>]: MapRelation<T[K], (
                // TODO: use Pluck
                K extends keyof Relations ? Relations[K] : _RelationTypeAt<T, K>
                )>

        }> &
        MetaType.Extend<T, MetaType.Of<T> extends//
            DataUnion<infer Base, infer Children, infer ChildRelations> ?
            DataUnion<Base, Children, Assign<Relations, ChildRelations>> :
            DataUnion<T, {}, Relations>//
            >;

    type MergeChildrenRelations<Children, Relations> = {
        [K in keyof Children]:
        MergeRelations<Children[K], Relations>
    };


    type _Instance<Base, Children, Relations> =
        MetaType.Extend<Base,
            DataUnion<//
                MergeRelations<Base, Relations>,
                MergeChildrenRelations<Children, Relations>,
                Relations//
                >//
            >;

    type Instance<Base,
        Children extends DataUnion.Children<Base>,
        Relations extends DataUnion.Relations<Base>> =
        _Instance<Base, MapInstances<Children>, MapInstances<Relations>>;


    type MapInstances<T> =
        { [K in keyof T]: InstanceType<Extract<T[K], new(...args: any[]) => any>> }
}

export function DataUnion<Base,
    U extends {
        relations?: DataUnion.Relations<Base>,
        children?: DataUnion.Children<Base>,
    }>(
    type: new(...args: any[]) => Base,
    union: U,
): DataUnion.Class<Base,
    NonNullable<Pluck<U, 'children', {}>>,
    NonNullable<Pluck<U, 'relations', {}>>>

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
    Class.unionChildren = mapObject(children, (child: DataUnion.Child<any>) => {
        if (DataUnion.isDataUnion(child)) {
            return DataUnion(child.unionType, {
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


DataUnion.isDataUnion = function (obj): obj is DataUnion<any, any, any> {
    return 'unionType' in obj
}
