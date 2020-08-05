import {ExpressBSON} from "../../express/ExpressBSON";
import {ExpressBSONTester} from "../../express/tests/ExpressBSONTests";
import {ExpressTester} from "../../rpc/tests/ExpressTests";
import {AEntity, BEntity, CEntity} from "../../typeorm/relations/tests/Entities";
import {RemoteDataSourceConnection} from "../RemoteDataSource";
import {DUnion, EUnion} from "./BaseEntities";
import {DataSourceTests} from "./DataSourceTests";
import {EDSTesters} from "../eds/tests/EntityDataSourceTests";


function RDSTester<T>(name): RemoteDataSourceConnection<T> {

    return new RemoteDataSourceConnection(async command => {
            return (await ExpressBSONTester.fetch({
                name,
                ...command
            }));
        }
    )
}

export const RDSTesters = {
    A: RDSTester<AEntity>("A"),
    B: RDSTester<BEntity>("B"),
    C: RDSTester<CEntity>("C"),
    D: RDSTester<DUnion>("E"),
    E: RDSTester<EUnion>("D"),
}


describe("RDS", () => {
    beforeEach(() => {

        ExpressTester.setExpressHandler((req, res) => {
            ExpressBSON()(req, res, async () => {
                const {name, cursor, method, args} = req.body;
                res.json(
                    await EDSTesters[name].withCursor(cursor)[method](...args)
                )
            });
        })
    })

    DataSourceTests(
        RDSTesters.A,
        RDSTesters.B,
        RDSTesters.C,
        RDSTesters.D,
        RDSTesters.E
    )
});

