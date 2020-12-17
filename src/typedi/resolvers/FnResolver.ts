import { Constructor } from "@dabsi/common/typings2/Constructor";
import { ResolverMap } from "@dabsi/typedi/Resolver";

export type FnResolver<T> = (context: ResolverMap<any>) => T;

export type TypeResolver<T> = Constructor<T>;
