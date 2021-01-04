import AclModule from "@dabsi/system/modules/acl";

import SystemModule from "@dabsi/system";
import { Module } from "@dabsi/typedi";

@Module({
  dependencies: [AclModule, SystemModule],
})
export default class AdminModule {
  constructor() {}
}
