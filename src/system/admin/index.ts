import SystemModule from "@dabsi/system/core/module";
import AclModule from "@dabsi/system/acl";
import { Module } from "@dabsi/typedi";
import SessionModule from "../../modules/session";

@Module({
  dependencies: [AclModule, SystemModule, SessionModule],
})
export default class AdminModule {
  constructor() {
    // registerPluginsDirectory("admin")
  }
}
