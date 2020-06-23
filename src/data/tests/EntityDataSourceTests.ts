import {AEntity, BEntity, CEntity, getABCTestConnection as connection} from "../../typeorm/relations/tests/Entities";
import {EntityDataSource} from "../EntityDataSource";
import {DataSourceTests} from "./DataSourceTests";
import objectContaining = jasmine.objectContaining;


export const EDSTesters = {
    A: EntityDataSource.create(AEntity, {connection}),
    B: EntityDataSource.create(BEntity, {connection}),
    C: EntityDataSource.create(CEntity, {connection})
}

describe('EDS', () => {
    DataSourceTests(EDSTesters.A, EDSTesters.B, EDSTesters.C);
});

it('loadMap', async () => {
    const A = EntityDataSource.create(AEntity, {connection});

    const aKey = await A.insert({});
    const bKey = await A.at("b", aKey).insert({});
    const cKey = await A.at("b", aKey).at("c", bKey).insert({});

    expect(await A.get(aKey)).not.toEqual(objectContaining({
        b: jasmine.any(Object)
    }));
    expect(await A.load({b: {c: true}}).get(aKey)).toEqual(objectContaining({
        b: objectContaining({
            b_id: jasmine.any(String),
            c: objectContaining({
                c_id: jasmine.any(String)
            })
        })
    }));


})


