import { checkResolverSymbol } from "./checkResolver";
import { CodeStackInfo } from "./CodeStackInfo";
import { AnyResolverMap } from "./ObjectResolver";
import { resolve, resolveSymbol } from "./resolve";
import { ResolveError } from "./ResolveError";
import { Resolver } from "./Resolver";

export class TokenResolver<T> {
  constructor(public codeStackInfo: CodeStackInfo, public token: string) {}

  provide(resolver: Resolver<T>): AnyResolverMap<T> {
    return { [this.token]: resolver };
  }

  [resolveSymbol](context): T {
    return resolve(context[this.token], context);
  }

  [checkResolverSymbol](context) {
    if (context[this.token] === undefined) {
      throw new ResolveError(
        `Can't resolve "${this.token}": ${this.codeStackInfo.description}`
      );
    }
  }
}
