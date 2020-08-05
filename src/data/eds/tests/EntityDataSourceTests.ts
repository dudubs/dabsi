import {AEntity, BEntity, CEntity,} from "../../../typeorm/relations/tests/Entities";
import {DBase, DUnion, EBase, EUnion} from "../../tests/BaseEntities";
import {DataSourceTests} from "../../tests/DataSourceTests";
import {TestConnection} from "../../tests/TestConnection";
import {EntityDataSource} from "../EntityDataSource";

const getConnection = TestConnection([AEntity, BEntity, CEntity]);
export const EDSTesters = {
    A: EntityDataSource.create(AEntity, getConnection),
    B: EntityDataSource.create(BEntity, getConnection),
    C: EntityDataSource.create(CEntity, getConnection),
    D: EntityDataSource.create(DUnion, getConnection),
    E: EntityDataSource.create(EUnion, getConnection),
}

testm(__filename, () => {

    DataSourceTests(
        EDSTesters.A,
        EDSTesters.B,
        EDSTesters.C,
        EDSTesters.D,
        EDSTesters.E
    );



});
