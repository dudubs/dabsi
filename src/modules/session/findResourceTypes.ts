import { BaseResource } from "@dabsi/modules/session/BaseResource";
import { Connection } from "typeorm";

export default function (connection: Connection): Function[] {
  /*
    Because we have to clean first the resoruces without any dependency of 
    other resource, this function return the resources by order of 
    not-owners to owners. for example A.b -> B, the order will be always
    B before A.
  */
  const resourceRelationMap = new Map<Function, Set<Function>>();
  const resourceTypes = new Set<Function>();

  const isResourceTypeAndNotChild = o =>
    typeof o === "function" && Object.getPrototypeOf(o) === BaseResource;

  for (const em of connection.entityMetadatas) {
    if (!isResourceTypeAndNotChild(em.target)) continue;
    resourceTypes.add(em.target as Function);

    for (const rm of em.relations) {
      if (!isResourceTypeAndNotChild(rm.type)) continue;

      resourceRelationMap
        .touch(rm.type as Function, () => new Set())
        .add(em.target as Function);
    }
  }

  return resourceTypes
    .toSeq()
    .flatMap(resType =>
      (resourceRelationMap.get(resType) || []).toSeq().concat([resType])
    )
    .toSet()
    .toArray();
}
