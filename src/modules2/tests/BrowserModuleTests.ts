import { BrowserModule2 } from "@dabsi/modules2/BrowserModule2";
import {
  ProjectDirectory,
  ProjectModule2,
} from "@dabsi/modules2/ProjectModule2";
import { ExpressModuleTester } from "@dabsi/modules2/tests/ExpressModuleTester";
import { Resolver } from "@dabsi/typedi";
import { ModuleTester } from "@dabsi/typemodule/tests/ModuleTester";
import { mkdir } from "fs";
import { mkdirSync, rmdir, rmdirSync } from "node:fs";
import path from "path";

const projectDir = path.join(__dirname, "tmp");

beforeAll(() => {
  mkdirSync(projectDir, { recursive: true });
});
afterAll(() => {
  rmdirSync(projectDir, { recursive: true });
});

const mt = ModuleTester({
  providers: [Resolver(ProjectDirectory, () => projectDir)],
  dependencies: [BrowserModule2, ProjectModule2],
});

const et = ExpressModuleTester(mt);

it("expect to file not found in <script> tag.", async () => {
  console.log(
    await et.axios.get("/bundle/browser/invalid-path.js").then(res => res.data)
  );
});
