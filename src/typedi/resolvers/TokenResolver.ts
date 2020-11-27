import { inspect } from "../../logging/inspect";
import { checkResolverSymbol } from "../operators/checkResolver";
import { CallStackInfo } from "../CallStackInfo";
import { AnyResolverMap } from "./ObjectResolver";
import { resolve, resolveSymbol } from "../resolve";
import { ResolveError } from "../ResolveError";
import { Resolver } from "../Resolver";

export class TokenResolver<T> {
  constructor(public codeStackInfo: CallStackInfo, public token: string) {}

  provide(resolver: Resolver<T>): AnyResolverMap<T> {
    return { [this.token]: resolver };
  }

  [inspect.custom]() {
    return `<Resolver ${this.token} ${this.codeStackInfo.description}>`;
  }

  get resolveMessage() {
    return `Can't resolve "${inspect(this)}`;
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
