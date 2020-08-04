// TODO: rename to EntityRelationTests.
import {Connection, Repository} from "typeorm";
import {
    DBase,
    DChild1,
    DChild1Child1,
    DChild2,
    EBase,
    EChild1,
    EChild1Child1,
    EChild2
} from "../../../data/tests/BaseEntities";
import {TestConnection} from "../../../data/tests/TestConnection";
import {focusNextTest} from "../../exp/tests/focusNextTest";
import {EntityRelation} from "../EntityRelation";
import {AEntity, BEntity, CEntity} from "./Entities";


testm(__filename, () => {
    const getConnection = TestConnection([
        AEntity, BEntity, CEntity,
        DBase, DChild1, DChild2, DChild1Child1,
        EBase, EChild1, EChild2, EChild1Child1
    ]);


    let connection: Connection;
    let ARepo: Repository<AEntity>;
    let BRepo: Repository<BEntity>;

    beforeAll(() => {
        connection = getConnection();
        ARepo = connection.getRepository(AEntity);
        BRepo = connection.getRepository(BEntity);
    })


    it('sanity', async () => {

        await assert(
            EntityRelation.of(connection, AEntity, "oneAToOneBOwner"),
            EntityRelation.of(connection, AEntity, "oneAToOneB"),
            EntityRelation.at(connection, AEntity, "oneAToOneBOwner"),
            EntityRelation.at(connection, AEntity, "oneAToOneB")
        );

        await assert(
            EntityRelation.of(connection, AEntity, "manyAToManyBOwner"),
            EntityRelation.of(connection, AEntity, "manyAToManyB"),
            EntityRelation.at(connection, AEntity, "manyAToManyBOwner"),
            EntityRelation.at(connection, AEntity, "manyAToManyB")
        );


        await assert(
            EntityRelation.of(connection, AEntity, "manyAToOneB"),
            EntityRelation.of(connection, AEntity, "oneAToManyB"),
            EntityRelation.at(connection, AEntity, "manyAToOneB"),
            EntityRelation.at(connection, AEntity, "oneAToManyB"),
        );

        async function assert(aOfBOwner, aOfB, bOwnerAtA, bAtA) {
            expect(aOfBOwner).toEqual(jasmine.objectContaining({
                left: jasmine.objectContaining({entityType: AEntity, isOwning: true}),
                right: jasmine.objectContaining({entityType: BEntity, isOwning: false}),
            }));

            expect(aOfB).toEqual(jasmine.objectContaining({
                left: jasmine.objectContaining({entityType: AEntity, isOwning: false}),
                right: jasmine.objectContaining({entityType: BEntity, isOwning: true}),
            }));

            expect(bOwnerAtA).toEqual(jasmine.objectContaining({
                left: jasmine.objectContaining({entityType: BEntity, isOwning: false}),
                right: jasmine.objectContaining({entityType: AEntity, isOwning: true}),
            }));

            expect(bAtA).toEqual(jasmine.objectContaining({
                left: jasmine.objectContaining({entityType: BEntity, isOwning: true}),
                right: jasmine.objectContaining({entityType: AEntity, isOwning: false}),
            }));

            await assertRelation(aOfBOwner);
            await assertRelation(aOfB);
            await assertRelation(bAtA);
            await assertRelation(bOwnerAtA);


        }

        async function assertRelation(relation: EntityRelation) {

            let [left] =
                await relation.left.repository.save([
                    relation.left.repository.create()
                ])
            let [right] =
                await relation.right.repository.save([
                    relation.right.repository.create()
                ])

            relation = relation.setRightId(right);

            const qb = relation.left.repository.createQueryBuilder()
            relation.innerJoin(qb);

            expect(await qb.getRawOne()).toBeFalsy();
            await relation.addOrSet(left);
            // expect(await qb.getRawOne()).toBeTruthy();
            // await relation.removeOrUnset(left);
            // expect(await qb.getRawOne()).toBeFalsy();
            // await relation.addOrSet(left);
            // expect(await qb.getRawOne()).toBeTruthy();

        }

    })

    it('tree', () => {

        const aOfA = EntityRelation.of(connection, AEntity, "manyAToManyA");
        const aAtA = EntityRelation.at(connection, AEntity, "manyAToManyA");
        const aOfAOwner = EntityRelation.of(connection, AEntity, "manyAToManyAOwner");
        const aAtAOwner = EntityRelation.at(connection, AEntity, "manyAToManyAOwner");

        expect(aOfA.isTree).toBeTruthy()
        expect(aAtA.isTree).toBeTruthy()


        expect(aOfA.left.isOwning).toBeFalsy()
        expect(aOfA.right.isOwning).toBeTruthy()
        expect(aOfAOwner.left.isOwning).toBeTruthy()
        expect(aOfAOwner.right.isOwning).toBeFalsy()

        expect(aAtA.left.isOwning).toBeTruthy();
        expect(aAtA.right.isOwning).toBeFalsy()
        expect(aAtAOwner.left.isOwning).toBeFalsy();
        expect(aAtAOwner.right.isOwning).toBeTruthy()

        expect(aOfA.getLeftConditionByTableJoin("lx", "jx"))
            .not.toEqual(aOfAOwner.getLeftConditionByTableJoin("lx", "jx"));


    });

    it('union', () => {
        const eOfD = EntityRelation.of(connection, DBase, "oneDToOneE");
        const eOfDChild1 = EntityRelation.of(connection, DChild1, "oneDToOneE");
        const eOwnerOfD = EntityRelation.of(connection, DBase, "oneDToOneEOwner");
        const eOwnerOfDChild1 = EntityRelation.of(connection, DChild1, "oneDToOneEOwner");

        console.log(
            eOwnerOfD.relationMetadata.isOwning,
            eOwnerOfDChild1.relationMetadata.isOwning,
            eOwnerOfD.isTree,
            eOwnerOfDChild1.isTree,
            eOwnerOfD.left.isOwning,
            eOwnerOfDChild1.left.isOwning
        );

        // ((x)=>{
        //     x(eOwnerOfD);
        //     x(eOwnerOfDChild1);
        // })((x:EntityRelation)=>{
        //     console.log([
        //         x.relationMetadata.isOwning,
        //         x.isTree,
        //         x.left.isOwning,
        //         x.entityType
        //     ]);
        // })



        expect(eOwnerOfD.left.isOwning)
            .toEqual(eOwnerOfDChild1.left.isOwning);

    })

})
