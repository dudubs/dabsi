import { Connection } from "typeorm";
import { ResolverMap } from "../../typedi/Resolver";
import { getSystemDatabaseConnection } from "./getSystemDatabaseConnection";

export const SystemResolvers: ResolverMap<any> = {
  ...Connection.provide(() => getSystemDatabaseConnection()),
};

/*

Consume

 */
