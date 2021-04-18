import { Tester } from "@dabsi/jasmine/Tester";
import { DataParameterConfigResolver } from "@dabsi/modules/data/parameter";
import { DataRowContext } from "@dabsi/modules/data/rowContext";
import { RpcConfigResolver } from "@dabsi/modules/rpc/configResolver";
import { DataSourceFactory2 } from "@dabsi/modules2/DataSourceFactory2";
import { DbModuleTester } from "@dabsi/modules2/tests/DbModuleTester";
import { RpcModuleTester } from "@dabsi/modules2/tests/RpcModuleTester";

import { BSource } from "@dabsi/typedata/entity/tests/utils";
import { ModuleTester } from "@dabsi/typemodule/tests/ModuleTester";
import TestEntities, {
  AEntity,
} from "@dabsi/typeorm/relations/tests/TestEntities";
import { RpcFn } from "@dabsi/typerpc/rpc-fn/RpcFn";
import { RpcMap } from "@dabsi/typerpc/rpc-map/RpcMap";
import { RpcParameter } from "@dabsi/typerpc/rpc-parameter/rpc";

const testRpc = RpcMap({
  aParam: RpcParameter(
    String,
    RpcMap({
      hello: RpcFn<() => string>(),
    })
  ),
});

const mt = ModuleTester();
const dbt = DbModuleTester(mt);
const rpct = RpcModuleTester(mt);

const t = Tester.beforeAll(async () => {
  dbt.module.entityTypes.push(...TestEntities);

  rpct.module.configure([
    DataParameterConfigResolver(testRpc.at("aParam"), AEntity),
    RpcConfigResolver(
      testRpc.at("aParam").at("target").at("hello"),
      {
        aRow: DataRowContext(AEntity),
      },
      c => async () => {
        return `hello ${await c.aRow.fetch(["aText"]).then(row => {
          return row?.aText;
        })}`;
      }
    ),
  ]);

  const getDataSource = mt.resolve(DataSourceFactory2);

  await mt.wait();

  const ASource = getDataSource(AEntity);

  const b1 = await BSource.insert({
    bText: "world-b",
  });
  return {
    a1: await ASource.insert({
      aText: "world-a",
      oneAToOneB: b1.$key,
    }),
    connection: rpct.createConnection(testRpc),
  };
});

fit("expect to fetch row", async () => {
  expect(await t.connection.aParam(t.a1.$key).hello()).toEqual("hello world-a");
});

it("expect to failed because invalidkey", async () => {
  return expectAsync(
    t.connection.aParam("x-invalid-key").hello()
  ).toBeRejected();
});
