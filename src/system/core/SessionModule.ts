import { Session } from "../../system-old/server/acl/Session";
import { DataSelectionRow } from "../../typedata/data-selection/DataSelectionRow";
import { DataRow } from "../../typedata/DataRow";
import { Module } from "../../typedi";
import { DbModule, DbModuleProvider } from "./DbModule";

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
