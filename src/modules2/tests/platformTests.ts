import { RpcModule2 } from "@dabsi/modules/rpc";
import { BrowserModule2 } from "@dabsi/modules2/BrowserModule2";
import { PlatformModule2 } from "@dabsi/modules2/PlatformModule2";
import { ProjectSettings } from "@dabsi/modules2/ProjectModule2";
import TestModule from "@dabsi/modules2/tests/test-module";
import { Resolver } from "@dabsi/typedi";
import { ModuleTester } from "@dabsi/typemodule/tests/ModuleTester";
import path from "path";

const t = ModuleTester([
  context => {
    Resolver.Context.assign(context, [
      new ProjectSettings(path.join(__dirname, "test-module")),
    ]);
  },
  BrowserModule2,
  RpcModule2,
  TestModule,
]).beforeAll(async t => {
  const platformModule = await t.getAndWait(PlatformModule2);

  const code = await platformModule.generateCode(
    path.join(__dirname, "bundle"),
    "browser"
  );

  return {
    platformModule,
    indexCode: code.codeMap[code.entityMap.index],
  };
});

it("expect to include internal browser files.", () => {
  expect(t.indexCode).toMatch(/\/test-module\/browser\/_internal"/);
});

it("expect to include rpc common files", () => {
  expect(t.indexCode).toMatch(/\/test-module\/common\/rpc"/);
});

it("expect to include index files", () => {
  expect(t.indexCode).toMatch(/\/test-module\/common"/);
  expect(t.indexCode).toMatch(/\/test-module\/view"/);
});
