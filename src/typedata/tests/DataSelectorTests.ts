import { DataTypeInfo } from "@dabsi/typedata/DataTypeInfo";
import { DEntity, DUnion } from "@dabsi/typedata/tests/BaseEntities";

it("DataSelector", () => {
  expect(DataTypeInfo.get(DUnion).type).toBe(DEntity);
});
