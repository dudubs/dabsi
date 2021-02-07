import { getMetadataArgsStorage } from "typeorm";

export function getRelationTypes() {}
export function findEntities(targets: Function[]): Function[] {
  const cache = new Set<Function>();
  const args = getMetadataArgsStorage();
  const inheritanceTargets = new Set(args.inheritances.map(i => i.target));
  for (const target of targets) {
    find(target);
  }
  return [...cache];

  function find(target) {
    if (cache.has(target)) return;
    cache.add(target);

    if (inheritanceTargets.has(target)) {
      args.tables
        .toSeq()
        .filter(
          t =>
            typeof t.target === "function" &&
            t.target.prototype instanceof target
        )
        .forEach(t => {
          find(t.target);
        });
    }

    for (let relation of getMetadataArgsStorage().relations) {
      if (typeof relation.type !== "function") continue;
      const type = relation.type();
      find(type);
    }
  }
}
