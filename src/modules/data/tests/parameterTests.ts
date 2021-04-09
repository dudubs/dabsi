import { Ticker } from "@dabsi/common/async/Ticker";
import { Tester } from "@dabsi/jasmine/Tester";
import { DataRowContext } from "@dabsi/modules/data/rowContext";
import { DataParameterConfigResolver } from "@dabsi/modules/data/paramterConfigResolver";
import { RpcConfigResolver } from "@dabsi/modules/rpc/configResolver";
import { RpcOldModuleTester } from "@dabsi/modules/rpc/tests/RpcOldModuleTester";
import DbOldModuleTester from "@dabsi/modules/tests/DbOldModuleTester";
import OldModuleTester from "@dabsi/system/rich-text/tests/OldOldModuleTester";
import { BSource } from "@dabsi/typedata/entity/tests/utils";
import TestEntities, {
  AEntity,
} from "@dabsi/typeorm/relations/tests/TestEntities";
import { RpcFn } from "@dabsi/typerpc/rpc-fn/RpcFn";
import { RpcMap } from "@dabsi/typerpc/rpc-map/RpcMap";
import { RpcParameter } from "@dabsi/typerpc/rpc-parameter/RpcParameter";

const testRpc = RpcMap({
  aParam: RpcParameter(
    String,
    RpcMap({
      hello: RpcFn<() => string>(),
    })
  ),
});

const mt = OldModuleTester();
const db = DbOldModuleTester(mt);
const rpc = RpcOldModuleTester(mt);

const t = Tester.beforeAll(async () => {
  db.addEntities(...TestEntities);
  await db.dbModule.init();

  rpc.module.configureRpcResolver(
    DataParameterConfigResolver(testRpc.at("aParam"), AEntity)
  );

  rpc.module.configureRpcResolver(
    RpcConfigResolver(
      testRpc.at("aParam").at("target").at("hello"),
      {
        aRow: DataRowContext(AEntity),
      },
      c => async () => {
        return `hello ${await c.aRow.fetch(["aText"]).then(row => row?.aText)}`;
      }
    )
  );

  const ASource = db.data.getSource(AEntity);

  const b1 = await BSource.insert({
    bText: "world-b",
  });
  return {
    a1: await ASource.insert({
      aText: "world-a",
      oneAToOneB: b1.$key,
    }),
    connection: rpc.createConnection(testRpc),
  };
});

it("expect to fetch row", async () => {
  expect(await t.connection.aParam(t.a1.$key).hello()).toEqual("hello world-a");
});

it("expect to failed because invalidkey", async () => {
  return expectAsync(
    t.connection.aParam("x-invalid-key").hello()
  ).toBeRejected();
});
