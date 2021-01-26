import { DataTypeInfo } from "@dabsi/typedata/typeInfo";
import { DEntity, DUnion } from "@dabsi/typedata/tests/BaseEntities";

it("DataSelector", () => {
  expect(DataTypeInfo.get(DUnion).type).toBe(DEntity);
});
