import { Session } from "@dabsi/system-old/server/acl/Session";
import { DataSelectionRow } from "@dabsi/typedata/data-selection/DataSelectionRow";
import { DataRow } from "@dabsi/typedata/DataRow";
import { Module } from "@dabsi/typedi";
import { DbModule, DbModuleProvider } from "@dabsi/system/core/DbModule";

export type SessionRow = DataRow<DataSelectionRow<Session, { pick: [] }>>;

@Module({
  dependencies: [DbModule],
  providers: [
    DbModuleProvider({
      entities: [Session],
    }),
  ],
})
export class SessionModule {
  // TODO: cli
}
