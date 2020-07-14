import {WeakMapFactory} from "../common/map/mapFactory";
import {getBaseFunction} from "./tests/getBaseFunction";

export const getSubClasses = WeakMapFactory((target: Function) => {
    const base = getBaseFunction(target);
    base && getSubClasses(base).add(target);
    return new Set<Function>();
});
