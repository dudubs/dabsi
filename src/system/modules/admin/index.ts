import SystemModule from "@dabsi/system";
import AclModule from "@dabsi/system/modules/acl";
import { Module } from "@dabsi/typedi";
import SessionModule from "../../../modules/session";

@Module({
  dependencies: [AclModule, SystemModule, SessionModule],
})
export default class AdminModule {
  constructor() {}
}
