import { Seq } from "immutable4";
import { getMetadataArgsStorage } from "typeorm";

// TODO: test by ABC & ED EntityTypes.

export function findEntityTypes(
  rootEntityTypes: Iterable<Function>
): Function[] {
  const args = getMetadataArgsStorage();

  const entityTypes = new Set<Function>();

  const relationTypeTargetsMap = new Map();

  for (const relationArg of args.relations) {
    if (typeof relationArg.type !== "function") continue;
    if (typeof relationArg.target !== "function") continue;
    const relationType = relationArg.type();

    relationTypeTargetsMap
      .touch(relationType, () => new Set())
      .add(relationArg.target);
  }

  Seq.Indexed(rootEntityTypes).forEach(function callback(entityType) {
    if (!entityTypes.touch(entityType)) return;
    relationTypeTargetsMap.forEach(callback);
  });

  return [...entityTypes];
}
