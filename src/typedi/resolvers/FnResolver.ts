import { Constructor } from "../../common/typings2/Constructor";
import { ResolverMap } from "../Resolver";

export type FnResolver<T> = (context: ResolverMap<any>) => T;

export type TypeResolver<T> = Constructor<T>;
