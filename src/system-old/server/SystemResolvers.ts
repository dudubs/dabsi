import { Connection } from "typeorm";
import { ResolverMap } from "@dabsi/typedi/Resolver";
import { getSystemDatabaseConnection } from "@dabsi/system-old/server/getSystemDatabaseConnection";

export const SystemResolvers: ResolverMap<any> = {
  ...Connection.provide(() => getSystemDatabaseConnection()),
};

/*

Consume

 */
