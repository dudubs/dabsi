// TODO: rename to EntityRelationTests.
import {Connection, Repository} from "typeorm";
import {TestConnection} from "../../../data/tests/TestConnection";
import {EntityRelation} from "../EntityRelation";
import {AEntity, BEntity, CEntity} from "./Entities";
import objectContaining = jasmine.objectContaining;


const getConnection = TestConnection([
    AEntity, BEntity, CEntity
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
        EntityRelation.of(connection, AEntity, "bOwner"),
        EntityRelation.of(connection, AEntity, "b"),
        EntityRelation.at(connection, AEntity, "bOwner"),
        EntityRelation.at(connection, AEntity, "b")
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

        let [left] = await relation.left.repository.save([relation.left.repository.create()])
        let [right] = await relation.right.repository.save([relation.right.repository.create()])

        relation = relation.setRightId(right);

        const qb = relation.left.repository.createQueryBuilder("a_entity")
        relation.innerJoin(qb);

        expect(await qb.getRawOne()).toBeFalsy();
        await relation.addOrSet(left);
        expect(await qb.getRawOne()).toBeTruthy();
        await relation.removeOrUnset(left);
        expect(await qb.getRawOne()).toBeFalsy();
        await relation.addOrSet(left);
        expect(await qb.getRawOne()).toBeTruthy();

    }

})

it('tree', () => {

    const aOfA = EntityRelation.of(connection, AEntity, "children");
    const aAtA = EntityRelation.at(connection, AEntity, "children");

    expect(aOfA.isTree).toBeTruthy()
    expect(aAtA.isTree).toBeTruthy()


    expect(aOfA.left.isOwning).toBeTruthy()
    expect(aOfA.right.isOwning).toBeFalsy()

    expect(aAtA.right.isOwning).toBeTruthy()
    expect(aAtA.left.isOwning).toBeFalsy()

})
