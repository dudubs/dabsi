import { DbModule2 } from "@dabsi/modules2/DbModule2";
import { Module } from "@dabsi/typemodule";

@Module({
  dependencies: [DbModule2],
})
export class DataModule2 {}