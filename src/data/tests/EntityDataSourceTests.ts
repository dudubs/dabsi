import {AEntity, BEntity, CEntity,} from "../../typeorm/relations/tests/Entities";
import {EntityDataSource} from "../eds/EntityDataSource";
import {DataSourceTests} from "./DataSourceTests";
import {TestConnection} from "./TestConnection";

const getConnection = TestConnection([AEntity, BEntity, CEntity]);
export const EDSTesters = {
    A: EntityDataSource.create(AEntity, {connection: getConnection}),
    B: EntityDataSource.create(BEntity, {connection: getConnection}),
    C: EntityDataSource.create(CEntity, {connection: getConnection})
}

testm(__filename, () => {
    DataSourceTests(EDSTesters.A, EDSTesters.B, EDSTesters.C);


    it('relationMap', async () => {

        const A = EntityDataSource.create(AEntity, {connection: getConnection});
        const aKey = await A.insert({});
        const bKey = await A.at("b", aKey).insert({});
        const cKey = await A.at("b", aKey).at("c", bKey).insert({});

        expect(await A.get(aKey)).not.toEqual(jasmine.objectContaining({
            b: jasmine.any(Object)
        }));


    })

});
