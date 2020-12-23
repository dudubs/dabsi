import { DataTypeInfo } from "@dabsi/typedata/DataTypeInfo";
import { DBase, DUnion } from "@dabsi/typedata/tests/BaseEntities";

it("DataSelector", () => {
  expect(DataTypeInfo.get(DUnion).type).toBe(DBase);
});
