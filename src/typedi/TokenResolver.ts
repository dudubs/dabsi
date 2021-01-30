import { inspect } from "@dabsi/logging/inspect";
import { CallStackInfo } from "@dabsi/typedi/CallStackInfo";

import { ResolveError } from "@dabsi/typedi/ResolveError";
import {
  ResolverContext,
  CustomResolver,
  Resolver,
  IResolver,
} from "@dabsi/typedi/Resolver";
IResolver.token = createTokenResolver;
declare module "./Resolver" {
  interface IResolver {
    // <T>(name?: string /* or __filename */): TokenResolver<T>;
    token: typeof createTokenResolver;
  }
}

let count = 0;

function createTokenResolver<T>(
  name?: string /* or __filename */
): TokenResolver<T> {
  return new TokenResolver(
    new CallStackInfo(new Error()),
    `token:${count++}_${name || "unknown"}`
  );
}

export interface TokenResolver<T> {
  new (): T;
}

export class TokenResolver<T> implements CustomResolver<T> {
  constructor(public codeStackInfo: CallStackInfo, public token: string) {}

  provide(resolver?: Resolver<T>): ResolverContext<T> {
    return {
      [this.token]:
        resolver ??
        (() => {
          throw new ResolveError("No resolve");
        }),
    };
  }

  [inspect.custom]() {
    return `<Resolver ${this.token} ${this.codeStackInfo.description}>`;
  }

  getResolveMessage(context) {
    return `Can't resolve ${inspect(this)}, context: ${inspect(context)}`;
  }

  [Resolver.resolveSymbol](context): T {
    const resolver = context[this.token];
    if (!resolver) throw new ResolveError(this.getResolveMessage(context));
    return Resolver.resolve(resolver, context);
  }

  [Resolver.checkSymbol](context) {
    if (context[this.token] === undefined) {
      throw new ResolveError(this.getResolveMessage(context));
    }
  }
}
