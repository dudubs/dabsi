import { getTestSource } from "@dabsi/typedata/entity/tests/utils";
import { DUnion } from "@dabsi/typedata/tests/BaseEntities";

it("expect to invalid child", () =>
  expectAsync(
    getTestSource(DUnion)
      .select({
        children: {
          // @ts-expect-error
          invaldChild: {},
        },
      })
      .get()
  ).toBeRejected());

it("expect to invalid field", () =>
  expectAsync(
    getTestSource(DUnion)
      .select({
        children: {
          dChild1: {
            pick:
              // @ts-expect-error
              ["invalid-field"],
          },
        },
      })
      .get()
  ).toBeRejected());
