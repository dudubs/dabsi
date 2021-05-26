import DbModule from "@dabsi/modules/DbModule";
import { Module } from "@dabsi/typemodule";

@Module({
  dependencies: [DbModule],
})
export class DataModule2 {}
