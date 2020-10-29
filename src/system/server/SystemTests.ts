import { SystemApp } from "../common/SystemApp";
import { SystemTester } from "./SystemTester";
import objectContaining = jasmine.objectContaining;

testm(__filename, () => {
  describe("getLoginInfo", () => {
    it("expect to success", async () => {
      SystemTester.testSystemAs("user");
      expect(await SystemApp.service.getLoginInfo()).toEqual(
        objectContaining({
          type: "SUCCESS",
        })
      );
    });
    it("expect to to fail", async () => {
      SystemTester.testSystemAs("guest");
      expect(await SystemApp.service.getLoginInfo()).toEqual(
        objectContaining({
          type: "FAILED",
        })
      );
    });
  });
});
