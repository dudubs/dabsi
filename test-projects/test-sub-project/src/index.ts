import { Module } from "@dabsi/typedi/Module";
import { TestProject } from "../../test-project/src";

@Module({
  dependencies: [TestProject],
})
export default class TestSubProject {}
