
import {Type} from "../common/typings";

export function decorateDesignType<T, K extends string>(target: Type<Record<K, T>>, key: K, type: Function & Type<T>, decorators: Function[]) {

    Reflect.decorate([...<any>decorators, Reflect.metadata("design:entityType", type)], target.prototype, key);
}
