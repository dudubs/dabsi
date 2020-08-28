import {RpcExpressHandler} from "../../rpc/RpcExpressHandler";
import {Service} from "../../rpc/Service";
import {ExpressTester} from "../../rpc/tests/ExpressTests";
import {AEntity, BEntity, CEntity} from "../../typeorm/relations/tests/Entities";
import {EDSTesters} from "../eds/tests/EntityDataSourceTests";
import {RemoteDataSource} from "../RemoteDataSource";
import {DUnion, EUnion} from "./BaseEntities";
import {DataSourceTests} from "./DataSourceTests";


export const RDSTesters = Service({
    A: RemoteDataSource<AEntity>(),
    B: RemoteDataSource<BEntity>(),
    C: RemoteDataSource<CEntity>(),
    D: RemoteDataSource<DUnion>(),
    E: RemoteDataSource<EUnion>(),
})

const RDSHandler = RpcExpressHandler(
    RDSTesters.createRpcHandler({
        A: EDSTesters.A,
        B: EDSTesters.B,
        C: EDSTesters.C,
        D: EDSTesters.D,
        E: EDSTesters.E,
    })
)

describe("RDS", () => {
    beforeEach(() => {

        ExpressTester.setExpressHandler(
            RDSHandler
        )
    })

    DataSourceTests(
        RDSTesters.A,
        RDSTesters.B,
        RDSTesters.C,
        RDSTesters.D,
        RDSTesters.E
    )
});

