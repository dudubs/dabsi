import {DataTypeInfo} from "../../../data/DataTypeInfo";
import {buildTestEntities} from "../../../data/eds/tests/buildTestEntities";
import {buildTestRelations} from "../../../data/eds/tests/buildTestRelations";
import {
    DBase,
    DChild1,
    DChild1Child1,
    DChild2,
    DUnion,
    EBase,
    EChild1,
    EChild1Child1,
    EChild2
} from "../../../data/tests/BaseEntities";
import {TestConnection} from "../../../data/tests/TestConnection";
import {DataExp} from "../../../json-exp/DataExp";
import {AEntity, BEntity, CEntity} from "../../relations/tests/Entities";
import {QbDataExpTranslator} from "../QbDataExpTranslator";
import {focusNextTest} from "./focusNextTest";
import {QbExpTester} from "./QbExpTester";


testm(__filename, () => {

    const getConnection = TestConnection([
        AEntity, BEntity, CEntity,
        DBase, DChild1, DChild2, DChild1Child1,
        EBase, EChild1, EChild2, EChild1Child1
    ]);

    beforeAll(async () => {

        const [a1] = await buildTestEntities(getConnection, AEntity, [
            {}
        ])


        const [b1] = await buildTestEntities(getConnection, BEntity, [
            {bText: "hello"}
        ])


        await buildTestRelations(getConnection, a1, {
            oneAToManyB: b1,
            oneAToOneBOwner: b1,
            oneAToOneB: b1,
            manyAToOneB: b1,
            manyAToManyB: b1,
        })


        await buildTestRelations(getConnection, a1, {
            manyAToManyBOwner: b1
        })


        const [eChild1] = await buildTestEntities(getConnection, EChild1, [
            {eChild1Text: "hello", eText: "hello"}
        ]);
        const [dChild1] = await buildTestEntities(getConnection, DChild1, [
            {dChild1Text: "hello", dText: "hello"}
        ]);

        await buildTestRelations(getConnection, dChild1, {
            manyDToOneE: eChild1,
            manyDToManyE: eChild1,
            manyDToManyEOwner: eChild1,
            manyDChild1ToOneE: eChild1,
            manyDChild1ToManyEOwner: eChild1,
            manyDChild1ToManyE: eChild1,
        });

    });


    const t = new QbExpTester(getConnection, AEntity);


    describe('relations', () => {


        const toManyRelationKeys = [
            "oneAToManyB",
            "manyAToManyBOwner",
            "manyAToManyB",
        ];

        // $count
        for (const key of toManyRelationKeys) {
            // @ts-ignore
            t.expectToExists([{$count: key}, ">", 0]);
            // @ts-ignore
            t.expectToExists([{$count: {[key]: {bText: "hello"}}}, ">", 0]);
            // @ts-ignore
            t.expectToNotExists([{$count: {[key]: {bText: "world"}}}, ">", 0]);
        }

        // $has
        for (const key of toManyRelationKeys) {
            // @ts-ignore
            t.expectToExists({$has: key});
            // @ts-ignore
            t.expectToExists({$has: {[key]: {bText: "hello"}}});
            // @ts-ignore
            t.expectToNotExists({$has: {[key]: {bText: "world"}}});
        }
        // @ts-ignore
        t.expectToError({$has: "manyAToOneB"});
        t.expectToError({$has: {manyAToOneB: true}});


        // $at
        t.expectToExists({$at: {oneAToOneB: {bText: "hello"}}});
        t.expectToExists({$at: {oneAToOneBOwner: {bText: "hello"}}});
        t.expectToNotExists({$at: {oneAToOneB: {bText: "world"}}});
        t.expectToNotExists({$at: {oneAToOneBOwner: {bText: "world"}}});

    })


    DataExpSanityTests({
        async run(exp): Promise<any> {
            const qb = getConnection().getRepository(AEntity)
                .createQueryBuilder();

            const sql = new QbDataExpTranslator(
                DataTypeInfo.get(AEntity), qb, qb.alias, qb
            )
                .translate(exp);
            qb.select(sql, 'value');
            return qb.getRawOne().then(row => row?.value)
        }
    });
    describe('$as sanity:', () => {

        const t = new QbExpTester<DUnion>(getConnection, DUnion);

        describe('DUnion as dChild1', () => {
            t.expectToExists({$as: {dChild1: {dText: "hello"}}});
            t.expectToExists({$as: {dChild1: {dChild1Text: "hello"}}});
            t.expectToNotExists({$as: {dChild1: {dChild1Text: "world"}}});
            t.expectToNotExists({$as: {dChild1Child1: {dText: "hello"}}});
            t.expectToNotExists({$as: {dChild1Child1: {dChild1Text: "hello"}}});
            t.expectToNotExists({$as: {dChild2: {dText: "hello"}}});
        })

        describe('DUnion at manyDToOneE*', () => {
            // relation to one

            t.expectToExists({$at: {manyDToOneE: {$as: {eChild1: {eChild1Text: "hello"}}}}});
            t.expectToNotExists({$at: {manyDToOneE: {$as: {eChild1: {eChild1Text: "world"}}}}});

        })


        describe('count manyDToManyE as eChild1', () => {

            // t.expectToExists([{$count: {manyDToManyEOwner: {$as: {eChild1: {eChild1Text: "hello"}}}}}, ">", 0]);
            // t.expectToNotExists([{$count: {manyDToManyEOwner: {$as: {eChild1: {eChild1Text: "world"}}}}}, ">", 0]);

            t.expectToExists([{$count: {manyDToManyE: {$as: {eChild1: {eChild1Text: "hello"}}}}}, ">", 0]);
            t.expectToNotExists([{$count: {manyDToManyE: {$as: {eChild1: {eChild1Text: "world"}}}}}, ">", 0]);
        })


        describe('DUnion as DChild1 at *ToOneE', () => {

            t.expectToExists({$as: {dChild1: {$at: {manyDChild1ToOneE: true}}}});
            t.expectToExists({$as: {dChild1: {$at: {manyDChild1ToOneE: {eText: "hello"}}}}});
            t.expectToNotExists({$as: {dChild1: {$at: {manyDChild1ToOneE: {eText: "world"}}}}});

        });

        describe('DUnion as DChild1 at *ToOneE as EChild1', () => {

            t.expectToExists({$as: {dChild1: {$at: {manyDChild1ToOneE: {$as: {eChild1: {eChild1Text: "hello"}}}}}}});
            t.expectToNotExists({$as: {dChild1: {$at: {manyDChild1ToOneE: {$as: {eChild1: {eChild1Text: "world"}}}}}}});
        })

        describe('DUnion as DChild1 count of *ToManyE*', () => {


            t.expectToExists([{$as: {dChild1: {$count: {manyDChild1ToManyEOwner: {eText: "hello"}}}}}, ">", 0]);
            t.expectToNotExists([{$as: {dChild1: {$count: {manyDChild1ToManyEOwner: {eText: "world"}}}}}, ">", 0]);

            describe('as EChild1', () => {

                t.expectToExists([{$as: {dChild1: {$count: {manyDChild1ToManyE: {$as: {eChild1: {eChild1Text: "hello"}}}}}}}, ">", 0]);
                t.expectToNotExists([{$as: {dChild1: {$count: {manyDChild1ToManyE: {$as: {eChild1: {eChild1Text: "world"}}}}}}}, ">", 0]);

                describe('<owner>', () => {
                    t.expectToExists([{$as: {dChild1: {$count: {manyDChild1ToManyEOwner: {$as: {eChild1: {eChild1Text: "hello"}}}}}}}, ">", 0]);
                    t.expectToNotExists([{$as: {dChild1: {$count: {manyDChild1ToManyEOwner: {$as: {eChild1: {eChild1Text: "world"}}}}}}}, ">", 0]);
                })
            })

        });
    })

});


function DataExpSanityTests<T>(
    t: {
        run(exp: DataExp<T>): Promise<any>
    }
) {

    /*
        $case: {
            of: ""

        }

     */


    test(1, [1, 2, 3], "$in", "$notIn");

    test(1, 0, '>=', '<');
    test(0, 1, '<=', '>');
    test(1, 1, '=', '!=');

    test(1, 0, '$greaterThanOrEqual', '$lessThan');
    test(0, 1, '$lessThanOrEqual', '$greaterThan');

    test(["hello"], ["hello"], '=', '!=');
    test(["hello"], ["hello"], '$equals', '$notEquals');
    test(["hello"], ["hel"], '$startsWith', '$notStartsWith');
    test(["hello"], ["hel"], '$contains', '$notContains');
    test(["hello"], ["llo"], '$endsWith', '$notEndsWith');

    function test(x, y, truthy, falsy) {
        describe('compare', async () => {

            it(`${x} ${truthy} ${y}`, async () => {
                expect(await t.run([x, truthy, y]))
                    .toBeTruthy();
            });

            it(`${x} ${falsy} ${y}`, async () => {
                expect(await t.run([x, falsy, y]))
                    .toBeFalsy();
            })


        })
    }
}
