import { inspect } from "@dabsi/logging/inspect";
import { CallStackInfo } from "@dabsi/typedi/CallStackInfo";

import { ResolveError } from "@dabsi/typedi/ResolveError";
import {
  AnyResolverMap,
  CustomResolver,
  Resolver,
} from "@dabsi/typedi/Resolver";

declare module "./Resolver" {
  interface IResolver {
    <T>(name?: string /* or __filename */): TokenResolver<T>;
  }
}

const { createResolver } = Resolver;
let count = 0;

Resolver.createResolver = function (csi, args) {
  if (!args.length || (args.length === 1 && typeof args[0] === "string")) {
    return new TokenResolver(csi, `token:${count++}_${args[0] || "unknown"}`);
  }

  return createResolver(csi, args);
};

export interface TokenResolver<T> {
  new (): T;
}

export class TokenResolver<T> implements CustomResolver<T> {
  constructor(public codeStackInfo: CallStackInfo, public token: string) {}

  provide(resolver?: Resolver<T>): AnyResolverMap<T> {
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
