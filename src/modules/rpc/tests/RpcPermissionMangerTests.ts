import { RpcPermissionReason } from "@dabsi/modules/rpc/RpcPermission";
import RpcPermissionQuery, {
  RpcPermissionMap,
} from "@dabsi/modules/rpc/RpcPermissionQuery";
import { Resolver, ResolverMap } from "@dabsi/typedi";
import { Rpc, RpcFuncational, RpcLocation, RpcMethod } from "@dabsi/typerpc";
import RpcPathMap from "@dabsi/typerpc/RpcPathMap";

let permsMap: RpcPermissionMap;

let permsMgr: RpcPermissionQuery;

class A extends Rpc {
  @RpcFuncational()
  test1!: RpcMethod;
}

class B extends Rpc {}

class C extends Rpc {}

const context: ResolverMap = {};

let ATest1Reason: boolean;
let AReason: boolean;

const ALoc = RpcLocation.at(A);
const ATest1Loc = ALoc.at("test1");

beforeEach(() => {
  ATest1Reason = false;
  AReason = false;
});

beforeAll(() => {
  permsMap = new RpcPathMap();
  permsMgr = new RpcPermissionQuery(permsMap);

  permsMap
    .setByLocation(ALoc, [() => () => (AReason ? "AReason" : undefined)])
    .setByLocation(ATest1Loc, [
      () => () => (ATest1Reason ? "ATest1Reason" : undefined),
    ]);

  Resolver.Context.assign(context, {});
});

for (const expectedAReason of [false, true]) {
  for (const expectedATest1Reason of [false, true]) {
    it(JSON.stringify({ expectedAReason, expectedATest1Reason }), async () => {
      AReason = expectedAReason;
      ATest1Reason = expectedATest1Reason;
      const result = await permsMgr.askAll(context, ATest1Loc);

      expectedAReason
        ? expect(result)
        : expect(result).not.toContain("AReason");

      expectedATest1Reason
        ? expect(result)
        : expect(result).not.toContain("ATest1Reason");
    });
  }
}
