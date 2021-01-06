import processRpcWithFormData from "@dabsi/system/core/browser/processRpcWithFormData";
import { SystemTestingConnection } from "@dabsi/system/testing/common/SystemTestingRpc";

it("expect to hello by parameter", async () => {
  expect(
    await SystemTestingConnection.sayHello({
      name: "david",
    })
  ).toEqual("Hello david!");
});

it("expect to hello by form-data", async () => {
  expect(
    await processRpcWithFormData(
      fd => {
        fd.append("person-name", "david");
      },
      () =>
        SystemTestingConnection.sayHello({
          name: "person-name",
        })
    )
  ).toEqual("Hello david!");
});
