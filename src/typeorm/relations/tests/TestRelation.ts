import {JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne} from "typeorm";
import {MapFactory} from "../../../common/map/mapFactory";
import {definedAt} from "../../../common/object/definedAt";
import {Type} from "../../../common/typings";
import {Relation} from "../../../data/Relation";

const targetToRelationKeys = MapFactory((target: Function) => new Set<string>());

export function TestRelation<T>(getInverseTargetType: () => Type<T>) {
    return <K extends string>(target:Partial<Record<K, Relation<T> | Relation<T>[]>>, relationName: K) => {

        const relationInfo = parseRelationName(relationName);

        const inverseRelationName = getInverseRelationName(
            relationInfo
        )


        const relationDecorator = definedAt(<any>{
            oneToOne: OneToOne,
            manyToMany: ManyToMany,
            manyToOne: ManyToOne,
            oneToMany: OneToMany,
        }, relationInfo.type)

        const ownerDecorator = {
            oneToOne: JoinColumn,
            manyToMany: JoinTable
        }[relationInfo.type];


        targetToRelationKeys(target.constructor).add(relationName);


        beforeAll(() => {

            const inverseTargetType = getInverseTargetType();

            assertTargetName(target.constructor.name,
                relationInfo.fromName);

            assertTargetName(inverseTargetType.name,
                relationInfo.toName);

            function assertTargetName(targetName:string,name:string) {

                const rootMatch = targetName.match(/^(?<name>.*)(Entity|Base)$/);
                const expectedName: string = rootMatch?.groups?.name ?? targetName;

                if (name !== expectedName) {
                    fail(`At ${relationName} expected ${expectedName} in place ${
                        name
                    }`)
                }


            }

            if (!targetToRelationKeys(inverseTargetType).has(inverseRelationName)) {
                console.log(`At ${inverseTargetType.name}, add: \n @TestRelation(() => ${
                    target.constructor.name})\n${
                    inverseRelationName}?: Relation<${target.constructor.name}>${
                    relationInfo.toType === "Many" ? "[]" : ""};
`)
            }
        })


        Reflect.decorate([
            ...(ownerDecorator && relationInfo.isOwner) ? [ownerDecorator()] : [],
            relationDecorator(getInverseTargetType, x => {
                return definedAt(x, inverseRelationName);
            }),

        ], target, relationName);

    }
}

function parseRelationName(name: string) {

    const isOwner = name.endsWith("Owner");

    const [_, fromType, fromName, toType, toName] = name.replace(/Owner$/, '')
        .match(/^(one|many)(\w+)To(One|Many)(\w+)$/)!;

    return {
        name,
        fromType, fromName, toType, toName, isOwner,
        type: fromType + 'To' + toType
    }

}

function getInverseRelationName(
    relationInfo: ReturnType<typeof parseRelationName>,
) {
    const {
        fromName, fromType, toType, toName,
        isOwner
    } = relationInfo;

    const relationType = fromType + "To" + toType;

    const isManyToManyOrOneToOne =
        (relationType === "oneToOne") || (relationType === "manyToMany");

    if (isOwner && !isManyToManyOrOneToOne)
        throw new Error('Invalid property name: ' + relationInfo.name)

    if (isManyToManyOrOneToOne) {
        return fromType + toName + 'To' + toType+ fromName
            + (isOwner ? "" : "Owner")
    }

    return inverseWords[fromType] + toName + 'To' + inverseWords[toType] + fromName;
}

const inverseWords = {
    one: "many", One: "Many",
    many: "one", Many: "One",
    Owner: "", "": "Owner"
};


describe('inverseRelationName', () => {

    test("A", "B");
    test("AChild1", "B");

    function test(A, B) {

        test("one", A, "Many", B, "");
        test("many", A, "One", B, "");
        test("many", A, "Many", B, "Owner");
        test("one", A, "One", B, "Owner");


        function test(fromType, fromName, toType, toName, owner) {

            test(
                fromType + fromName + 'To' + toType + toName + owner,
                (owner ? fromType : inverseWords[fromType]) + toName + 'To' +
                (owner ? toType : inverseWords[toType]) + fromName
            );


            function test(relationName: string, inverseRelationName: string) {
                it(`${relationName} <-> ${inverseRelationName}`, () => {
                    expect(getInverseRelationName(parseRelationName(relationName)))
                        .toEqual(inverseRelationName);
                    expect(getInverseRelationName(parseRelationName(inverseRelationName)))
                        .toEqual(relationName)
                })
            }
        }
    }


})
