import { Connection, getMetadataArgsStorage } from "typeorm";
import { DataRow } from "../../typedata/DataRow";
import { Resolver } from "../../typedi/Resolver";
import { SystemApp } from "../common/SystemApp";
import { User } from "./acl/User";
import { SystemRequestContext } from "./SystemRequestContext";
import { SystemSession } from "./SystemSession";
import { testSystemAs } from "./SystemTester";
import objectContaining = jasmine.objectContaining;

testm(__filename, () => {
  it("check system request context", () => {
    expect(() =>
      Resolver.checkContext({
        ...SystemRequestContext,
        ...Connection.provide(() => {
          throw new Error("No connection");
        }),
        ...DataRow(SystemSession).provide(() => {
          throw new Error("No systemSession");
        }),
      })
    ).not.toThrow();
  });
  describe("getLoginInfo", () => {
    it("expect 'regular' login info", async () => {
      testSystemAs("regular");
      expect(await SystemApp.service.getLoginInfo()).toEqual(
        objectContaining({
          type: "SUCCESS",
          isAdmin: false,
        })
      );
    });

    it("expect to 'admin' login info", async () => {
      testSystemAs("admin");
      expect(await SystemApp.service.getLoginInfo()).toEqual(
        objectContaining({
          type: "SUCCESS",
          isAdmin: true,
        })
      );
    });
    it("expect to 'SystemApp' login info", async () => {
      testSystemAs("anonymous");
      expect(await SystemApp.service.getLoginInfo()).toEqual(
        objectContaining({
          type: "FAILED",
        })
      );
    });
  });
});
