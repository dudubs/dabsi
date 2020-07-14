import {AEntity, BEntity, CEntity, getEntityTestConnection as getConnection} from "../../typeorm/relations/tests/Entities";
import {$object, $string} from "../../validators";
import {expectToBeValid} from "../../validators/tests/expectToBeValid";
import {EntityDataSource} from "../eds/EntityDataSource";
import {DataSourceTests} from "./DataSourceTests";


export const EDSTesters = {
    A: EntityDataSource.create(AEntity, {connection: getConnection}),
    B: EntityDataSource.create(BEntity, {connection: getConnection}),
    C: EntityDataSource.create(CEntity, {connection: getConnection})
}

describe('EDS', () => {
    DataSourceTests(EDSTesters.A, EDSTesters.B, EDSTesters.C);
});


describe('relationMap', () => {

    let aKey, bKey, cKey;

    let a;

    beforeAll(async () => {
        const A = EntityDataSource.create(AEntity, {connection: getConnection});
        aKey = await A.insert({});
        bKey = await A.at("b", aKey).insert({});
        cKey = await A.at("b", aKey).at("c", bKey).insert({});

        a = await A.load({b: {c: true}}).get(aKey);
    })

    it('expect load relation B key', () => {
        expect(a).toEqual(jasmine.objectContaining({
            b: jasmine.objectContaining({
                $key: jasmine.any(String)
            })
        }))
    })

    it('expect load relation C key', () => {
        expect(a).toEqual(jasmine.objectContaining({
            b: jasmine.objectContaining({
                c: jasmine.objectContaining({
                    $key: jasmine.any(String)
                })
            })
        }))
    })
    it('expect load relation B', () => {
        expect(a).toEqual(
            jasmine.objectContaining({
                b: jasmine.objectContaining({
                    b_id: jasmine.any(String),
                    c: jasmine.objectContaining({
                        c_id: jasmine.any(String)
                    })
                })
            })
        );
    })

    it('expect load relation C', () => {
        expectToBeValid(a, $object({
            b: $object({
                c: $object({
                    c_id: $string
                })
            })
        }))
    });

});

it('relationMap', async () => {

    const A = EntityDataSource.create(AEntity, {connection: getConnection});
    const aKey = await A.insert({});
    const bKey = await A.at("b", aKey).insert({});
    const cKey = await A.at("b", aKey).at("c", bKey).insert({});

    expect(await A.get(aKey)).not.toEqual(jasmine.objectContaining({
        b: jasmine.any(Object)
    }));


})

