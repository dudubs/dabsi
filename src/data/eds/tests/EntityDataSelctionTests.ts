import {Connection, Repository} from "typeorm";
import {AEntity, BEntity, CEntity} from "../../../typeorm/relations/tests/Entities";
import {DataSelection} from "../../DataSelection";
import {TestConnection} from "../../tests/TestConnection";
import {QueryBuilderSelector} from "../QueryBuilderSelector";
import {EntityDataSelection} from "../EntityDataSelection";
import {expectEvery} from "../../../jasmine/expectEvery";
import {expectKeyInObject, expectKeyNotInObject} from "../../../jasmine/expectors";
import {testCase} from "../../../jasmine/testCase";
import DataSelectionRow = DataSelection.Row;
import objectContaining = jasmine.objectContaining;

// function getEntityMetadataFromQueryBilder


const getConnection = TestConnection([AEntity, BEntity, CEntity]);

let connection: Connection;

let ARepo: Repository<AEntity>;
let BRepo: Repository<BEntity>;
let CRepo: Repository<CEntity>;


let a1: AEntity;
let a2: AEntity;

let b1: BEntity;
let b2: BEntity;

beforeAll(async () => {
    connection = getConnection();
    ARepo = connection.getRepository(AEntity);
    BRepo = connection.getRepository(BEntity);
    CRepo = connection.getRepository(CEntity);

    [a1, a2] = await ARepo.save([
        ARepo.create(),
        ARepo.create()
    ]);

    [b1, b2] = await BRepo.save([
        BRepo.create(),
        BRepo.create()
    ])

    await ARepo.createQueryBuilder()
        .relation("oneAToManyB").of(a1)
        .add([b1, b2]);

    await ARepo.createQueryBuilder()
        .relation("manyAToOneB").of(a1)
        .set(b1);

    await ARepo.createQueryBuilder()
        .relation("manyAToManyBOwner").of(a1)
        .add([b1, b2]);

    await ARepo.createQueryBuilder()
        .relation("manyAToManyB").of(a1)
        .add([b1, b2]);


})


testEveryRow('omit keys', {omit: ["a_text"]}, row => {
    expectKeyNotInObject(row, "a_text");
    expectKeyInObject(row, "a_id");
});

testEveryRow('omit all', {omit: "all"}, row => {
    expectKeyNotInObject(row, "a_text");
    expectKeyNotInObject(row, "a_id");
});

testEveryRow('pick keys', {pick: ["a_text"]}, row => {
    expectKeyNotInObject(row, "a_id");
    expectKeyInObject(row, "a_text");
});

testEveryRow('add fields', {fields: {hello: ["world"]}}, row => {
    expect(row.hello).toEqual("world")
});

testEveryRow('replace fields', {fields: {a_text: ["world"]}}, row => {
    expect(row.a_text).toEqual("world")
});


describe('relation to one', () => {
    testEveryRow('not null', {
        relations: {manyAToOneB: {notNull: true}}
    }, row => {
        expect(row.manyAToOneB).toBeTruthy()
    });

    test('nullable', {


        relations: {manyAToOneB: false}/*notNull: false (get nulls)*/
    }, rows => {

        testCase('without relation', () => {
            expect(rows).toContain(objectContaining({
                manyAToOneB: null
            }));
        })

        testCase('with relation', () => {
            expect(rows).toContain(objectContaining({
                manyAToOneB: objectContaining({
                    b_id: jasmine.anything()
                })
            }));
        })
    });

});



it('', async () => {
    expectEvery(
        await selectRow(a1, {
            relations: {
                manyAToManyB: true,
                manyAToOneB: true
            }
        })
            .then(x => x.manyAToManyB),
        row => {

        }
    )

})


function testEveryRow<S extends DataSelection<AEntity>>(
    title, selection: S,
    callback: (row: DataSelection.Row<AEntity, S>) => void) {

    test(title, selection, rows => {
        expectEvery(rows, row => {
            return callback(row)
        })
    })
}



function select<S extends DataSelection<AEntity>>(selection: S) {
    const qb = ARepo.createQueryBuilder();

    qb.expressionMap.selects.length = 0;
    const selector = new QueryBuilderSelector(qb);

    const loader = EntityDataSelection.select(
        qb,
        selector,
        selection,
        qb.alias,
        'r_'
    );

    return {qb, loader}
}

async function selectRow<S extends DataSelection<AEntity>>(
    a: AEntity,
    selection: S): Promise<DataSelection.Row<AEntity, S>> {
    const {qb, loader} = select(selection);
    qb.andWhereInIds(a);
    const rows = await loader.loadMany();
    expect(rows.length).toEqual(1);
    return rows[0]
}

async function selectRows<S extends DataSelection<AEntity>>(selection: S): Promise<DataSelectionRow<AEntity, S>[]> {
    const {qb, loader} = select(selection);
    const rows = await loader.loadMany();
    expect(rows.length).toBeGreaterThan(0);
    return rows
}


function test<S extends DataSelection<AEntity>>(title: string, selection: S,
                                                callback: (rows: DataSelectionRow<AEntity, S>[]) => any) {

    (title.startsWith("!") ? fit : it)(title, async () => {
        await callback(await selectRows(selection));

    })
}
