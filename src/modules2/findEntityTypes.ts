import { readdirRecursiveSync } from "@dabsi/filesystem/readdirRecursiveSync";
import { Seq } from "immutable4";
import { getMetadataArgsStorage } from "typeorm";

// TODO: test by ABC & ED EntityTypes.

export function findEntityTypes(rootEntityTypes: Function[]): Function[] {
  const args = getMetadataArgsStorage();

  const entityTypes = new Set<Function>();

  const relationTypes = new Map<Function, Set<Function>>();

  const childrenTypes = new Map<Function, Set<Function>>();

  for (const tableArg of args.tables) {
    if (typeof tableArg.target !== "function") continue;
    if (tableArg.type === "entity-child") {
      childrenTypes
        .touch(Object.getPrototypeOf(tableArg.target), () => new Set())
        .add(tableArg.target);
    }
  }

  for (const relationArg of args.relations) {
    if (typeof relationArg.type !== "function") continue;
    if (typeof relationArg.target !== "function") continue;
    const relationType = relationArg.type();

    relationTypes.touch(relationType, () => new Set()).add(relationArg.target);
    relationTypes.touch(relationArg.target, () => new Set()).add(relationType);
  }

  Seq.Indexed(rootEntityTypes).forEach(function callback(entityType) {
    if (!entityTypes.touch(entityType)) return;
    relationTypes.get(entityType)?.forEach(callback);
    childrenTypes.get(entityType)?.forEach(callback);
  });

  return [...entityTypes];
}
