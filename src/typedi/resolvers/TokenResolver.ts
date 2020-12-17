import { inspect } from "@dabsi/logging/inspect";
import { checkResolverSymbol } from "@dabsi/typedi/operators/checkResolver";
import { CallStackInfo } from "@dabsi/typedi/CallStackInfo";
import { AnyResolverMap } from "@dabsi/typedi/resolvers/ObjectResolver";
import { resolve, resolveSymbol } from "@dabsi/typedi/resolve";
import { ResolveError } from "@dabsi/typedi/ResolveError";
import { Resolver } from "@dabsi/typedi/Resolver";

export class TokenResolver<T> {
  constructor(public codeStackInfo: CallStackInfo, public token: string) {}

  provide(resolver: Resolver<T>): AnyResolverMap<T> {
    return { [this.token]: resolver };
  }

  [inspect.custom]() {
    return `<Resolver ${this.token} ${this.codeStackInfo.description}>`;
  }

  get resolveMessage() {
    return `Can't resolve ${inspect(this)}`;
  }

  [resolveSymbol](context): T {
    const resolver = context[this.token];
    if (!resolver) throw new ResolveError(this.resolveMessage);
    return resolve(resolver, context);
  }

  [checkResolverSymbol](context) {
    if (context[this.token] === undefined) {
      throw new ResolveError(this.resolveMessage);
    }
  }
}
