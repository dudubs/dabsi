import { touchMap } from "@dabsi/common/map/touchMap";
import { Constructor } from "@dabsi/common/typings2/Constructor";
import { Resource } from "@dabsi/modules/session/resource";
import { Connection } from "typeorm";

export default function (connection: Connection): Function[] {
  const resourceParentTypeMap = new Map<Function, Set<Function>>();
  const resourceTypes = new Set<Function>();

  connection.entityMetadatas
    .toSeq()
    .filter(em => {
      if (typeof em.target !== "function") return false;
      return Object.getPrototypeOf(em.target) === Resource;
    })
    .forEach(em => {
      resourceTypes.add(em.target as Function);
      em.relations
        .toSeq()
        .filter(
          rm =>
            typeof rm.type === "function" &&
            Object.getPrototypeOf(em.target) === Resource
        )
        .forEach(rm => {
          touchMap(
            resourceParentTypeMap,
            rm.type as Function,
            () => new Set()
          ).add(em.target as Function);
        });
    });

  return resourceTypes
    .toSeq()
    .flatMap(resType => {
      return (resourceParentTypeMap.get(resType) || [])
        .toSeq()
        .concat([resType]);
    })
    .toSet()
    .toArray();
}
