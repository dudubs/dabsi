import AclModule from "@dabsi/system/acl";

import { SystemModule } from "@dabsi/system/core/SystemModule";
import { Module } from "@dabsi/typedi";

@Module({
  dependencies: [AclModule, SystemModule],
})
export default class AdminModule {
  constructor() {}
}
