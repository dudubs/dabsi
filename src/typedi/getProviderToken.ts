import { WeakMapFactory } from "@dabsi/common/map/mapFactory";

let counter = 0;

export default WeakMapFactory((target: Function) => {
  if (typeof target !== "function") {
    throw new TypeError(`Expected to function.`);
  }
  return `${target.name}:${++counter}`;
});
