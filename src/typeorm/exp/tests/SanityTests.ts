import {Connection, Repository} from "typeorm";
import {
    ABase,
    AChild1,
    AChild1Child1,
    AChild2,
    AUnion,
    BBase,
    BChild1,
    BChild1Child1,
    BChild2,
    BUnion
} from "../../../data/tests/BaseEntities";
import {TestConnection} from "../../../data/tests/TestConnection";
import {AEntity, BEntity, CEntity} from "../../relations/tests/Entities";
import {useQueryBuilderExp} from "../useQueryBuilderExp";
import {QbExpTester} from "./QbExpTester";

useQueryBuilderExp();


testm(__filename, () => {


    const getConnection =
        TestConnection([
            AEntity, BEntity, CEntity,
            ABase, AChild1, AChild2, AChild1Child1,
            BBase, BChild1, BChild2, BChild1Child1
        ]);


    let connection: Connection;
    let AEntityRepo: Repository<AEntity>;
    let BEntityRepo: Repository<BEntity>;

    let ABaseRepo: Repository<ABase>;
    let BBaseRepo: Repository<BBase>;


    beforeAll(() => {
        connection = getConnection()
        // @ts-ignore
        AEntityRepo = connection.getRepository(AEntity);
        BEntityRepo = connection.getRepository(BEntity);

        ABaseRepo = connection.getRepository(ABase);
        BBaseRepo = connection.getRepository(BBase);
    });


    describe('unions', () => {

        const t = new QbExpTester(getConnection, AUnion);

        beforeAll(async () => {

            const [b1] = await new QbExpTester(getConnection, BUnion)
                .as(BChild1).save([
                    {bChild1Text: "hello", bText: "hello"}
                ]);
            const [a1] = await t.as(AChild1).save([
                {aChild1Text: "hello", aText: "hello"}
            ])

            await connection.getRepository(AChild1)
                .createQueryBuilder()
                .relation("manyAToOneB")
                .of(a1).set(b1)

            await connection.getRepository(AChild1)
                .createQueryBuilder()
                .relation("manyAToManyB")
                .of(a1).add(b1)

            await connection.getRepository(AChild1)
                .createQueryBuilder()
                .relation("manyAToManyBOwner")
                .of(a1).add(b1)


            // deep
            await connection.getRepository(AChild1)
                .createQueryBuilder()
                .relation("manyAChild1ToOneB")
                .of(a1).set(b1)

            await connection.getRepository(AChild1)
                .createQueryBuilder()
                .relation("manyAChild1ToManyBOwner")
                .of(a1).add(b1)
        });

        t.expectToExists({$as: {aChild1: {aText: "hello"}}});
        t.expectToExists({$as: {aChild1: {aChild1Text: "hello"}}});
        t.expectToNotExists({$as: {aChild1: {aChild1Text: "world"}}});
        t.expectToNotExists({$as: {aChild1Child1: {aText: "hello"}}});
        t.expectToNotExists({$as: {aChild1Child1: {aChild1Text: "hello"}}});
        t.expectToNotExists({$as: {aChild2: {aText: "hello"}}});

        // relation to one
        t.expectToExists({$at: {manyAToOneB: {$as: {bChild1: {bChild1Text: "hello"}}}}});
        t.expectToNotExists({$at: {manyAToOneB: {$as: {bChild1: {bChild1Text: "world"}}}}});

        // relation to many
        t.expectToExists([{$count: {manyAToManyBOwner: {$as: {bChild1: {bChild1Text: "hello"}}}}}, ">", 0]);
        t.expectToNotExists([{$count: {manyAToManyBOwner: {$as: {bChild1: {bChild1Text: "world"}}}}}, ">", 0]);

        t.expectToExists([{$count: {manyAToManyB: {$as: {bChild1: {bChild1Text: "hello"}}}}}, ">", 0]);
        t.expectToNotExists([{$count: {manyAToManyB: {$as: {bChild1: {bChild1Text: "world"}}}}}, ">", 0]);


        describe('as AChild1', () => {
            describe('at one B', () => {
                t.expectToExists({$as: {aChild1: {$at: {manyAChild1ToOneB: true}}}});
                t.expectToExists({$as: {aChild1: {$at: {manyAChild1ToOneB: {bText: "hello"}}}}});
                t.expectToNotExists({$as: {aChild1: {$at: {manyAChild1ToOneB: {bText: "world"}}}}});

                describe('as BChild1', () => {
                    t.expectToExists({$as: {aChild1: {$at: {manyAChild1ToOneB: {$as: {bChild1: {bChild1Text: "hello"}}}}}}});
                    t.expectToNotExists({$as: {aChild1: {$at: {manyAChild1ToOneB: {$as: {bChild1: {bChild1Text: "world"}}}}}}});
                })
            });

            describe('count of B', () => {
                t.expectToExists([{$as: {aChild1: {$count: {manyAChild1ToManyBOwner: {bText: "hello"}}}}}, ">", 0]);
                t.expectToNotExists([{$as: {aChild1: {$count: {manyAChild1ToManyBOwner: {bText: "world"}}}}}, ">", 0]);

                describe('as BChild1', () => {

                    t.expectToExists([{$as: {aChild1: {$count: {manyAChild1ToManyB: {$as: {bChild1: {bChild1Text: "hello"}}}}}}}, ">", 0]);
                    t.expectToNotExists([{$as: {aChild1: {$count: {manyAChild1ToManyB: {$as: {bChild1: {bChild1Text: "world"}}}}}}}, ">", 0]);

                    describe('<owner>',()=>{
                        t.expectToExists([{$as: {aChild1: {$count: {manyAChild1ToManyBOwner: {$as: {bChild1: {bChild1Text: "hello"}}}}}}}, ">", 0]);
                        t.expectToNotExists([{$as: {aChild1: {$count: {manyAChild1ToManyBOwner: {$as: {bChild1: {bChild1Text: "world"}}}}}}}, ">", 0]);
                    })
                })

            });

        })

    })

    describe('relations', () => {

        const tester = new QbExpTester(getConnection, AEntity);

        beforeAll(async () => {
            const [a1] = await AEntityRepo.save([
                AEntityRepo.create({})
            ]);

            const [b1] = await BEntityRepo.save([
                BEntityRepo.create({
                    bText: "hello"
                })
            ]);

            await AEntityRepo.createQueryBuilder()
                .relation("oneAToManyB").of(a1)
                .add(b1);

            await AEntityRepo.createQueryBuilder()
                .relation("bOwner").of(a1)
                .set(b1);

            await AEntityRepo.createQueryBuilder()
                .relation("b").of(a1)
                .set(b1);

            await AEntityRepo.createQueryBuilder()
                .relation("manyAToOneB").of(a1)
                .set(b1);

            await AEntityRepo.createQueryBuilder()
                .relation("manyAToManyB").of(a1)
                .add(b1);

            await AEntityRepo.createQueryBuilder()
                .relation("manyAToManyBOwner").of(a1)
                .add(b1);
        })

        const toManyRelationKeys = [
            "oneAToManyB",
            "manyAToManyBOwner",
            "manyAToManyB",
        ];

        // $count
        for (const key of toManyRelationKeys) {
            tester.expectToExists([{$count: key}, ">", 0]);
            tester.expectToExists([{$count: {[key]: {bText: "hello"}}}, ">", 0]);
            tester.expectToNotExists([{$count: {[key]: {bText: "world"}}}, ">", 0]);
        }

        // $has
        for (const key of toManyRelationKeys) {
            tester.expectToExists({$has: key});
            tester.expectToExists<any>({$has: {[key]: {bText: "hello"}}});
            tester.expectToNotExists<any>({$has: {[key]: {bText: "world"}}});
        }
        tester.expectToError<any>({$has: "manyAToOneB"});
        tester.expectToError({$has: {manyAToOneB: true}});


        // $at
        tester.expectToExists({$at: {b: {bText: "hello"}}});
        tester.expectToExists({$at: {bOwner: {bText: "hello"}}});
        tester.expectToNotExists({$at: {b: {bText: "world"}}});
        tester.expectToNotExists({$at: {bOwner: {bText: "world"}}});

    })


});
