import { getMetadataArgsStorage } from "typeorm";

let cacheForLength = 0;
let cache: any = null;
function buildMetadata() {
  const metadataArgs = getMetadataArgsStorage();

  if (cache && cacheForLength === metadataArgs.tables.length) {
    return cache as ReturnType<typeof rebuild>;
  }
  cacheForLength = metadataArgs.tables.length;

  return (cache = rebuild());

  function rebuild() {
    const targetChildrenMap = new Map<Function, Function[]>();

    for (const { target } of metadataArgs.inheritances) {
      if (typeof target !== "function") continue;
      targetChildrenMap.set(target, []);
    }

    for (const { target: child } of metadataArgs.tables) {
      if (typeof child !== "function") continue;
      for (const parent of targetChildrenMap.keys()) {
        if (child.prototype instanceof parent) {
          targetChildrenMap.get(parent)!.push(child);
        }
      }
    }

    const targetRelationTypeMap = new Map<Function, Set<Function>>();

    for (const { target, type: getType } of metadataArgs.relations) {
      if (typeof target !== "function") continue;
      if (typeof getType !== "function") continue;
      const type = getType();

      targetRelationTypeMap.touch(target, () => new Set()).add(type);
    }

    return { targetRelationTypeMap, targetChildrenMap };
  }
}

export function findEntities(targets: Function[], debug = false): Function[] {
  const entityTypes = new Set<Function>();

  const { targetRelationTypeMap, targetChildrenMap } = buildMetadata();

  let nextTargets = new Set<Function>(targets);
  while (nextTargets.size) {
    const targets = nextTargets;
    nextTargets = new Set();
    for (const target of targets) {
      if (!entityTypes.touch(target)) continue;

      const parent = Object.getPrototypeOf(target);
      nextTargets.addAll(targetRelationTypeMap.get(parent) || []);
      nextTargets.addAll(targetRelationTypeMap.get(target) || []);
      nextTargets.addAll(targetChildrenMap.get(target) || []);
    }
  }

  return [...entityTypes];
}
